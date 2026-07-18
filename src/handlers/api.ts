import serverless from 'serverless-http';
import app from '../app.js'; // Note the .js extension because module: NodeNext requires it when compiled to ESM

export const handler = serverless(app);
