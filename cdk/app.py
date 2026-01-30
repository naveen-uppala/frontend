#!/usr/bin/env python3
import aws_cdk as cdk
from ecs_stack import EcsServiceStack

app = cdk.App()

EcsServiceStack(
    app,
    "ecs-fargate-service",
    env=cdk.Environment(
        account=cdk.Aws.ACCOUNT_ID,
        region=cdk.Aws.REGION,
    ),
)

app.synth()
