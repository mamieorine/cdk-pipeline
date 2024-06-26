#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { CdkPipelineStack } = require('../lib/cdk-pipeline-stack');

const app = new cdk.App();
new CdkPipelineStack(app, 'CdkPipelineStack', {});
