# Deployment Guide

This guide explains how to deploy the AWS Lambda Express API to your AWS account.

## Guided Deployment (First Time)

For the first deployment, run the guided command to configure the stack name, region, and parameters:

```bash
npm run build
npm run deploy
```

### Prompt Guidance
During `sam deploy --guided`, you will be prompted for:
1. **Stack Name**: The name of the CloudFormation stack to create (e.g., `aws-lambda-express-api`).
2. **AWS Region**: The AWS region you want to deploy to (e.g., `us-east-1`).
3. **Confirm changes before deploy**: Set to `Y` if you want to manually review changes before they are applied.
4. **Allow SAM CLI IAM role creation**: Set to `Y` to allow SAM to create required IAM roles for Lambda and API Gateway.
5. **Disable rollback**: Set to `N` to roll back changes automatically if deployment fails.
6. **ExpressApiFunction may not have authorization defined**: Set to `Y` (this is normal for public APIs; endpoints can be secured via custom middleware in Express if required).
7. **Save arguments to configuration file**: Set to `Y` (saves configuration to `samconfig.toml` so future deployments can just use `sam deploy`).

---

## Subsequent Deployments

Once configured, subsequent deployments only require:

```bash
npm run build
sam deploy
```

---

## CI/CD Pipeline

To automate deployments, you can set up a GitHub Actions workflow or AWS CodePipeline. A typical deployment job requires:
1. Installing Node.js dependencies
2. Setting up AWS Credentials (`aws-actions/configure-aws-credentials`)
3. Installing AWS SAM CLI
4. Running `sam build`
5. Running `sam deploy --no-confirm-changeset --no-fail-on-empty-changeset`
