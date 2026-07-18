import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

// Main Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the AWS Lambda Express API with TypeScript!',
    status: 'Running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      users: 'GET /users',
      createUser: 'POST /users'
    }
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    uptime: process.uptime()
  });
});

// Mock database for users
interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
];

// Get users
app.get('/users', (req: Request, res: Response) => {
  res.json({
    count: users.length,
    users
  });
});

// Create user
app.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email
  };
  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

// Handle 404 Route NotFound
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.url}`
  });
});

export default app;
