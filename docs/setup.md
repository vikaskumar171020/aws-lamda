# Local Development Setup Guide

Follow these instructions to set up the project locally and run the development environment.

## Prerequisites

Ensure you have the following installed on your local machine:
1. **Node.js** (v20.x or higher recommended)
2. **npm** (comes with Node.js)
3. **AWS CLI** (configured with your AWS credentials)
4. **AWS SAM CLI** (for local testing and deployment)
5. **Docker** (required by SAM to emulate the Lambda environment locally)

---

## 1. Install Dependencies

In the root of the project, run:
```bash
npm install
```

This installs TypeScript, Express, Jest for testing, and the required AWS types.

---

## 2. Compile and Build

Use AWS SAM to build the application. This compiles the TypeScript code using `esbuild` according to the settings in `template.yaml`.

```bash
npm run build
```

---

## 3. Run Locally

To spin up a local emulation of AWS API Gateway and Lambda:

```bash
npm run local
```

This will start a local server at `http://127.0.0.1:3000`. You can send HTTP requests to this endpoint using tools like `curl`, Postman, or your browser.

---

## 4. Run Unit Tests

To run the Jest test suite:

```bash
npm test
```

---

## 5. TypeScript Check

To run TypeScript verification without generating files:

```bash
npm run type-check
```
