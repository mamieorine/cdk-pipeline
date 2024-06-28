const cdk = require('aws-cdk-lib');
const { Function, Runtime, Code } = require('aws-cdk-lib/aws-lambda');

class MyLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
      super(scope, id, props);

      new Function(this, 'CustomAuthorizationFunction', {
        runtime: Runtime.NODEJS_20_X,
        handler: 'index.handler',
        code: Code.fromAsset("lib/lambda/customAuthorization"),
        environment: {
          JWT_SIGNATURE: 'JWT_SIGNATURE',
        },
      });
    }
}

module.exports = { MyLambdaStack }
