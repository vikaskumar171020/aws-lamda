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

A GitHub Actions workflow has been configured at [.github/workflows/ci.yml](file:///Volumes/MacDisk/AWS/aws-lamda/.github/workflows/ci.yml).

### Workflow Design
- **Validation**: Triggered on all `pull_request` events to `main` or `master`. It performs:
  1. Repository Checkout.
  2. Node.js Environment Setup.
  3. Clean Dependency Installation (`npm ci`).
  4. TypeScript Type Checking (`npm run type-check`).
  5. Jest Unit Testing (`npm test`).
- **Deployment**: Triggered on `push` events (e.g., when a pull request is merged) to `main` or `master`. Currently, this contains placeholder steps that can be uncommented and configured with:
  1. AWS Credentials Configuration using GitHub secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).
  2. AWS SAM CLI Setup.
  3. Running `sam build` and `sam deploy`.

