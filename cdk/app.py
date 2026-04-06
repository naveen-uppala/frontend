#!/usr/bin/env python3
import aws_cdk as cdk
from ecs_stack import EcsFargateServiceStack

app = cdk.App()

EcsFargateServiceStack(
    app,
    "ecs-fargate-service-1",
    env=cdk.Environment(
        account=cdk.Aws.ACCOUNT_ID,
        region=cdk.Aws.REGION,
    ),
)

app.synth()
