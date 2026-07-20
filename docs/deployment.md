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
- **Deployment**: Triggered **only manually** via the GitHub Actions tab (`workflow_dispatch`). When triggering, you choose from three version increment options: `Patch`, `Minor`, or `Major`. It performs:
  1. **Versioning**: Parses the current version in `package.json`, bumps it according to your selection (`Patch`, `Minor`, or `Major`), and updates the version inside `package.json`.
  2. Node.js environment setup and dependency installation (`npm ci`).
  3. AWS SAM CLI and AWS Credentials configuration.
  4. Running `sam build` to compile the functions.
  5. **Artifact Archiving**: Zips the compiled build folder (`.aws-sam/`), `template.yaml`, and the updated `package.json` into `aws-v{version}.zip`.
  6. **Upload Artifact**: Attaches the zip as a run artifact named `aws-v{version}` (e.g., `aws-v1.0.1`) to the GitHub Actions run.
  7. **Transactional Deploy & Auto-Rollback**: Deploys the application using `sam deploy`. If the deployment fails for any reason (e.g., syntax errors, network errors, AWS validation failures), AWS CloudFormation natively triggers a transactional rollback, returning all resources back to the state of the **last successful deployment**.
  8. **Create GitHub Release**: Creates a new GitHub Release tagged with the version (e.g., `aws-v1.0.1`) and attaches the `aws-v{version}.zip` package as a release asset.
---

## AWS OIDC Configuration (GitHub Actions Integration)

To allow GitHub Actions to securely assume an IAM Role on AWS without static secret keys:

1. **Configure OIDC Identity Provider in AWS**:
   - Go to **IAM** -> **Identity providers** -> **Add provider**.
   - Provider type: **OpenID Connect**.
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
2. **Create IAM Role**:
   - Go to **IAM** -> **Roles** -> **Create role**.
   - Select trusted entity: **Web identity**.
   - Identity provider: `token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
   - Select your GitHub organization/username, repository name, and branch limits.
   - Attach policies allowing CloudFormation execution, Lambda deployment, API Gateway configuration, and S3 access (e.g., Administrator access or custom SAM policy).
3. **Configure GitHub Secret**:
   - Add `AWS_ROLE_TO_ASSUME` repository secret containing the full ARN of the created IAM Role (e.g., `arn:aws:iam::123456789012:role/GithubActionsSAMDeployer`).
