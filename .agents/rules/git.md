# Git Workflows and Commit Guidelines

This workspace rule guides the AI agent and developers on how to perform Git operations, write commit messages, and manage branches.

## Rules

### 1. Commit Message Format (Conventional Commits)
All commits must follow the Conventional Commits specification. The message should be structured as follows:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Allowed Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Example Commit Messages:
- `feat(api): add GET /users endpoint`
- `fix(auth): resolve JWT expiration token validation bug`
- `docs(readme): update deployment instructions`

---

### 2. Branch Naming Conventions
Create descriptive branches using the following prefix patterns:
- `feature/<short-description>`: For new features (e.g., `feature/add-payment-gateway`)
- `bugfix/<short-description>`: For bug fixes (e.g., `bugfix/resolve-login-crash`)
- `hotfix/<short-description>`: For urgent production patches (e.g., `hotfix/security-vulnerability`)
- `docs/<short-description>`: For documentation updates (e.g., `docs/update-api-spec`)

---

### 3. Pre-Commit Checklist
Before making a commit, ensure the following checks are complete:
1. **Linter & Formatter**: Run `npm run lint` or `npm run format` to ensure code adheres to styling guidelines.
2. **Type Checking**: Run `npm run type-check` (or `npx tsc --noEmit`) to verify there are no TypeScript compiler errors.
3. **Tests**: Ensure all unit tests pass by running `npm test`.
4. **Secret Scanning**: Do not commit secrets, environment credentials (`.env`), or private keys.

---

### 4. Git Push & Pull Safety Rules
- **No Force Pushing**: Never use `git push --force` on public or shared branches (especially `main` or `master`). If necessary on feature branches, use `git push --force-with-lease`.
- **Sync Regularly**: Always run `git pull origin <branch-name>` before pushing to avoid conflicts and keep your branch up-to-date with upstream changes.
