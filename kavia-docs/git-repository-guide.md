# Git Repository Guide for Order Processing Component

This document provides instructions on how to push changes to the Order Processing Component repository, including the Swagger client implementation and documentation updates.

## Prerequisites

Before pushing changes to the repository, ensure you have:

1. Git installed on your local machine
2. Proper access rights to the repository
3. A basic understanding of Git commands
4. All changes ready to be committed

## Git Commands for Pushing Changes

### 1. Check Repository Status

Before making any commits, check the status of your local repository to see which files have been modified:

```bash
cd /home/kavia/workspace/order-processing
git status
```

This command will show:
- Modified files
- Untracked files
- Files staged for commit

### 2. Stage Changes

To stage all changes for commit:

```bash
# Stage all changes
git add .

# Or stage specific files
git add OrderProcessingService/src/main/java/com/kavia/orderprocessing/config/SwaggerConfig.java
git add README.md
```

### 3. Commit Changes

Commit your staged changes with a descriptive message:

```bash
git commit -m "Add Swagger client implementation and update documentation"
```

Use meaningful commit messages that describe what changes were made. For more complex changes, you can use a multi-line commit message:

```bash
git commit -m "Add Swagger client implementation and update documentation

- Implemented OpenAPI configuration in SwaggerConfig.java
- Added springdoc-openapi dependency in pom.xml
- Updated README.md with API documentation information"
```

### 4. Pull Latest Changes

Before pushing your changes, it's good practice to pull the latest changes from the remote repository to avoid conflicts:

```bash
git pull origin main
```

Replace `main` with your branch name if you're working on a different branch.

### 5. Resolve Conflicts (if any)

If there are conflicts after pulling, you'll need to resolve them:

1. Open the conflicted files in your editor
2. Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Edit the files to resolve conflicts
4. Stage the resolved files:
   ```bash
   git add <resolved-file-paths>
   ```
5. Complete the merge:
   ```bash
   git commit -m "Resolve merge conflicts"
   ```

### 6. Push Changes

Push your committed changes to the remote repository:

```bash
# Push to the main branch
git push origin main

# Or push to a specific branch
git push origin <branch-name>
```

## Working with Branches

### Creating a New Branch

If you're working on a new feature or bug fix, it's recommended to create a dedicated branch:

```bash
# Create and switch to a new branch
git checkout -b feature/swagger-implementation

# Or create a branch without switching to it
git branch feature/swagger-implementation
```

### Switching Between Branches

```bash
git checkout <branch-name>
```

### Merging Branches

After completing work on a feature branch, merge it back to the main branch:

```bash
# First switch to the target branch
git checkout main

# Then merge your feature branch
git merge feature/swagger-implementation
```

## Best Practices for the Order Processing Component

1. **Commit Frequently**: Make small, focused commits that address a single issue or feature
2. **Write Clear Commit Messages**: Begin with a verb and describe what the commit does
3. **Use Branches**: Create feature branches for new functionality or bug fixes
4. **Review Before Committing**: Use `git diff` to review changes before staging
5. **Pull Before Push**: Always pull the latest changes before pushing
6. **Include Tests**: Ensure any code changes include appropriate tests
7. **Update Documentation**: Keep the README and other documentation in sync with code changes

## Handling Swagger Client Implementation

When pushing changes related to the Swagger client implementation:

1. Ensure all OpenAPI annotations are correctly applied to controllers
2. Verify the SwaggerConfig.java file is properly configured
3. Check that the springdoc-openapi dependency is included in pom.xml
4. Test the Swagger UI endpoint (http://localhost:8080/swagger-ui.html) before pushing
5. Include any generated client code if applicable

## Troubleshooting Common Issues

### Authentication Issues

If you encounter authentication issues:

```bash
# Set your Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Use credential helper to cache credentials
git config --global credential.helper cache
```

### Reverting Changes

If you need to revert a commit:

```bash
# Revert the most recent commit
git revert HEAD

# Revert a specific commit
git revert <commit-hash>
```

### Viewing Commit History

To view the commit history:

```bash
# View full history
git log

# View condensed history
git log --oneline

# View history with branch graph
git log --graph --oneline --all
```

## Conclusion

Following these Git commands and best practices will help maintain a clean and organized repository for the Order Processing Component. Remember to always test your changes locally before pushing them to the repository, and keep documentation up to date with code changes.