# Better Commit Workflow

A project to show how to set up:
- Commitlint check on Pull Request
- Commitlint with dynamic scope
- Auto-generated changelog
- Auto-generated version bump on `main` merge, generate tag and push a new tag to Github

## Test commit messages

### Correct
```
echo "feat: this is a message" | pnpm commitlint"
echo "feat(components--button): this is a message" | pnpm commitlint
echo "feat(utils--math): update logic" | pnpm commitlint
echo "feat(utils--math): add test" | pnpm commitlint
echo "feat(dependencies): add commitlint" | pnpm commitlint
```

### Incorrect
```
echo "feature: this is a message" | pnpm commitlint
echo "feat(button): this is a message" | pnpm commitlint
echo "feat(aaa): update logic" | pnpm commitlint
```