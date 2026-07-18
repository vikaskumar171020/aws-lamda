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
- **Deployment**: Triggered on `push` events (e.g., when a pull request is merged) to `main` or `master`. It performs:
  1. Node.js environment setup and dependency installation (`npm ci`).
  2. AWS SAM CLI and AWS Credentials configuration.
  3. Running `sam build` to compile the functions.
  4. **Artifact Archiving**: Zips the compiled build folder (`.aws-sam/`), `template.yaml`, and `package.json` into `deploy-package.zip`.
  5. **Upload Artifact**: Attaches `deploy-package.zip` as a run artifact (`sam-deploy-package`) to the GitHub Action run.
  6. **Transactional Deploy & Auto-Rollback**: Deploys the application using `sam deploy`. If the deployment fails for any reason (e.g., syntax errors, network errors, AWS validation failures), AWS CloudFormation natively triggers a transactional rollback, returning all resources back to the state of the **last successful deployment**.


