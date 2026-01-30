from aws_cdk import (
    Stack,
    CfnParameter,
    aws_ecs as ecs,
    aws_ec2 as ec2,
    aws_elasticloadbalancingv2 as elbv2,
)
from constructs import Construct


class EcsFargateServiceStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)

        # ==================================================
        # Parameters (Harness-style)
        # ==================================================
        service_name = CfnParameter(self, "ServiceName")
        image_uri = CfnParameter(self, "ImageUri")
        container_port = CfnParameter(self, "ContainerPort", default=8080)
        desired_count = CfnParameter(self, "DesiredCount", default=1)

        vpc_id = CfnParameter(self, "VpcId")
        subnet_ids = CfnParameter(
            self, "SubnetIds", type="List<String>"
        )

        cluster_name = CfnParameter(self, "ClusterName")

        alb_arn = CfnParameter(self, "AlbArn")
        listener_arn = CfnParameter(self, "ListenerArn")
        listener_priority = CfnParameter(
            self, "ListenerPriority", default=100
        )

        # ==================================================
        # Import EXISTING VPC (NO lookup)
        # ==================================================
        vpc = ec2.Vpc.from_vpc_attributes(
            self,
            "Vpc",
            vpc_id=vpc_id.value_as_string,
            availability_zones=self.availability_zones,
            private_subnet_ids=subnet_ids.value_as_list
        )

        # ==================================================
        # Import EXISTING ECS Cluster
        # ==================================================
        cluster = ecs.Cluster.from_cluster_attributes(
            self,
            "Cluster",
            cluster_name=cluster_name.value_as_string,
            vpc=vpc,
            security_groups=[]
        )

        # ==================================================
        # Import EXISTING ALB + Listener
        # ==================================================
        alb = elbv2.ApplicationLoadBalancer.from_application_load_balancer_attributes(
            self,
            "Alb",
            load_balancer_arn=alb_arn.value_as_string,
            security_group_id="sg-placeholder"
        )

        listener = elbv2.ApplicationListener.from_application_listener_attributes(
            self,
            "Listener",
            listener_arn=listener_arn.value_as_string,
            security_group_id="sg-placeholder"
        )

        # ==================================================
        # Task Definition
        # ==================================================
        task_def = ecs.FargateTaskDefinition(
            self,
            "TaskDef",
            cpu=1024,
            memory_limit_mib=2048
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
                container_port=int(container_port.value_as_string)
            )
        )

        # ==================================================
        # Create NEW Target Group
        # ==================================================
        target_group = elbv2.ApplicationTargetGroup(
            self,
            "TargetGroup",
            vpc=vpc,
            port=int(container_port.value_as_string),
            protocol=elbv2.ApplicationProtocol.HTTP,
            target_type=elbv2.TargetType.IP,
            health_check=elbv2.HealthCheck(
                path="/",
                healthy_http_codes="200"
            )
        )

        # Attach TG to EXISTING listener (path-based routing)
        listener.add_target_groups(
            "ListenerRule",
            priority=int(listener_priority.value_as_string),
            conditions=[
                elbv2.ListenerCondition.path_patterns(
                    [f"/{service_name.value_as_string}/*"]
                )
            ],
            target_groups=[target_group]
        )

        # ==================================================
        # ECS Fargate Service
        # ==================================================
        service = ecs.FargateService(
            self,
            "Service",
            service_name=service_name.value_as_string,
            cluster=cluster,
            task_definition=task_def,
            desired_count=int(desired_count.value_as_string),
            assign_public_ip=False
        )

        # Register service with Target Group
        service.attach_to_application_target_group(target_group)
