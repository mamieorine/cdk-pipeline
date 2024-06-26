const cdk = require('aws-cdk-lib');
const { CodePipeline, CodePipelineSource, ShellStep } = require('aws-cdk-lib/pipelines');

class CdkPipelineStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('mamieorine/cdk-pipeline', 'main', {
          connectionArn: 'arn:aws:codestar-connections:eu-west-2:975050056288:connection/0ab59c2c-3254-4475-ac2c-4ef4412542c1', // Created using the AWS console * });',
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const stage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "975050056288", region: "eu-west-2" }
    }));
  }
}

module.exports = { CdkPipelineStack }
