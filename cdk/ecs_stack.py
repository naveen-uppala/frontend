from aws_cdk import (
    Stack,
    CfnParameter,
    aws_ecs as ecs,
    aws_ec2 as ec2,
    aws_elasticloadbalancingv2 as elbv2,
    aws_iam as iam
)
from constructs import Construct


class EcsFargateServiceStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)

        # ==================================================
        # Parameters (CORRECT TYPES)
        # ==================================================
        service_name = CfnParameter(self, "ServiceName")

        image_uri = CfnParameter(self, "ImageUri")

        container_port = CfnParameter(
            self,
            "ContainerPort",
            type="Number",
            default=8080
        )

        desired_count = CfnParameter(
            self,
            "DesiredCount",
            type="Number",
            default=1
        )

        listener_priority = CfnParameter(
            self,
            "ListenerPriority",
            type="Number",
            default=100
        )

        vpc_id = CfnParameter(self, "VpcId")

        subnet_ids = CfnParameter(
            self,
            "SubnetIds",
            type="List<String>"
        )

        cluster_name = CfnParameter(self, "ClusterName")

        alb_arn = CfnParameter(self, "AlbArn")

        listener_arn = CfnParameter(self, "ListenerArn")

        alb_sg_id = CfnParameter(self, "AlbSecurityGroupId")

        # ==================================================
        # Convert subnet IDs → Subnet objects
        # ==================================================
        subnets = [
            ec2.Subnet.from_subnet_id(self, f"Subnet{i}", subnet_id)
            for i, subnet_id in enumerate(subnet_ids.value_as_list)
        ]

        # ==================================================
        # Minimal VPC reference (required by CDK v2)
        # ==================================================
        vpc = ec2.Vpc.from_vpc_attributes(
            self,
            "Vpc",
            vpc_id=vpc_id.value_as_string,
            availability_zones=["dummy"]
        )

        # ==================================================
        # Import EXISTING ECS Cluster (vpc REQUIRED in v2)
        # ==================================================
        cluster = ecs.Cluster.from_cluster_attributes(
            self,
            "Cluster",
            cluster_name=cluster_name.value_as_string,
            vpc=vpc,
            security_groups=[]
        )

        # ==================================================
        # Import EXISTING ALB + Listener (CDK v2 compliant)
        # ==================================================
        alb_sg = ec2.SecurityGroup.from_security_group_id(
            self,
            "AlbSecurityGroup",
            alb_sg_id.value_as_string
        )

        elbv2.ApplicationLoadBalancer.from_application_load_balancer_attributes(
            self,
            "Alb",
            load_balancer_arn=alb_arn.value_as_string,
            security_group_id=alb_sg_id.value_as_string
        )

        listener = elbv2.ApplicationListener.from_application_listener_attributes(
            self,
            "Listener",
            listener_arn=listener_arn.value_as_string,
            security_group=alb_sg
        )

        # ==================================================
        # Task Definition
        # ==================================================
        execution_role = iam.Role(
            self,
            "ExecutionRole",
            assumed_by=iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AmazonECSTaskExecutionRolePolicy"
                )
            ]
        )
        
        task_def = ecs.FargateTaskDefinition(
            self,
            "TaskDef",
            cpu=1024,
            memory_limit_mib=2048,
            execution_role=execution_role
        )


        container = task_def.add_container(
            "Container",
            container_name=service_name.value_as_string,
            image=ecs.ContainerImage.from_registry(
                image_uri.value_as_string
            ),
            logging=ecs.LogDrivers.aws_logs(
                stream_prefix=service_name.value_as_string
            )
        )

        container.add_port_mappings(
            ecs.PortMapping(
                container_port=container_port.value_as_number
            )
        )

        # ==================================================
        # Target Group
        # ==================================================
        target_group = elbv2.ApplicationTargetGroup(
            self,
            "TargetGroup",
            vpc=vpc,
            port=container_port.value_as_number,
            protocol=elbv2.ApplicationProtocol.HTTP,
            target_type=elbv2.TargetType.IP,
            health_check=elbv2.HealthCheck(
                path="/",
                healthy_http_codes="200"
            )
        )

        listener.add_target_groups(
            "ListenerRule",
            priority=listener_priority.value_as_number,
            conditions=[elbv2.ListenerCondition.path_patterns(["/*"])],
            target_groups=[target_group]
        )

        # ==================================================
        # ECS Fargate Service (PUBLIC SUBNETS)
        # ==================================================
        service = ecs.FargateService(
            self,
            "Service",
            service_name=service_name.value_as_string,
            cluster=cluster,
            task_definition=task_def,
            desired_count=desired_count.value_as_number,
            assign_public_ip=True,
            vpc_subnets=ec2.SubnetSelection(
                subnets=subnets
            )
        )

        service.attach_to_application_target_group(target_group)
