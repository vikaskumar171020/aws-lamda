# AWS Lambda Express API (TypeScript)

This project contains a Node.js web application built with TypeScript, using Express for routing and [serverless-http](https://github.com/dougmoscrop/serverless-http) to wrap it for running inside AWS Lambda. The deployment and local orchestration are powered by the [AWS Serverless Application Model (SAM)](https://aws.amazon.com/serverless/sam/).

## Directory Structure

```
.
├── .agents/
│   └── rules/
│       └── git.md             # Git commit and branching rules for AGY/developers
├── .vscode/
│   └── settings.json          # Workspace settings for VS Code
├── docs/
│   ├── architecture.md        # Architecture overview and design diagrams
│   ├── setup.md               # Local installation, building, and running guides
│   ├── deployment.md          # Guide to deploy stack using SAM CLI
│   └── api-spec.md            # Detailed API documentation and examples
├── src/
│   ├── handlers/
│   │   └── api.ts             # AWS Lambda handler entry point
│   └── app.ts                 # Express router and business logic
├── test/
│   └── app.test.ts            # Route tests using Jest and Supertest
├── jest.config.js             # Testing suite configurations
├── package.json               # Dependencies and development scripts
├── tsconfig.json              # TypeScript compilation settings
├── template.yaml              # AWS SAM application template
└── .gitignore                 # Files excluded from git tracking
```

## Quick Start

### 1. Pre-requisites
Make sure you have Node.js (v20.x+), AWS SAM CLI, and Docker installed.

### 2. Setup
Install Node dependencies:
```bash
npm install
```

### 3. Running unit tests
Verify everything is working correctly:
```bash
npm test
```

### 4. Running locally
Build the SAM app and launch local API Gateway server:
```bash
npm run build
npm run local
```
Open `http://127.0.0.1:3000` to interact with your Express app running inside a local Lambda emulation!

---

## Documentation Links
- Detailed architecture: [docs/architecture.md](file:///Volumes/MacDisk/AWS/aws-lamda/docs/architecture.md)
- Development setup guide: [docs/setup.md](file:///Volumes/MacDisk/AWS/aws-lamda/docs/setup.md)
- Deployment instructions: [docs/deployment.md](file:///Volumes/MacDisk/AWS/aws-lamda/docs/deployment.md)
- API specification: [docs/api-spec.md](file:///Volumes/MacDisk/AWS/aws-lamda/docs/api-spec.md)
- AGY Git rules: [.agents/rules/git.md](file:///Volumes/MacDisk/AWS/aws-lamda/.agents/rules/git.md)
