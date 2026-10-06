---
name: commit-summary
description: Write a Conventional Commits message from the current git diff. Use when asked to write, draft, suggest or summarise a commit message for the current changes. It only writes the message; it does not stage, commit or push.
---

Write a commit message for the current changes in the Conventional Commits format. Do not stage, commit or push anything; only output the message.

## 1. Read the diff

Run these commands:

```bash
git status --short
git diff --staged
```

If something is staged, describe only the staged changes. If nothing is staged, run `git diff` and describe the unstaged changes instead, and say so in your reply. Untracked files from `git status` count as added files; read them if they matter to the summary.

If there are no changes at all, say so and stop.

## 2. Pick the type and scope

Choose one type:

| Type | Use for |
| --- | --- |
| `feat` | A new feature the user can see |
| `fix` | A bug fix |
| `docs` | Documentation only (README, AGENTS.md, comments) |
| `style` | Formatting with no change in behaviour |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A performance improvement |
| `test` | Adding or changing tests |
| `build` | Dependencies, `package.json`, `next.config.ts` |
| `ci` | `.github/workflows/` |
| `chore` | Anything else (tooling, `.claude/`, config) |

Add a scope when the change sits in one area, using the folder or route name, for example `ingredients`, `menus`, `lib`, `layout` or `deploy`. Leave it out when the change spans several areas.

If the diff mixes unrelated changes, say so and suggest splitting it into separate commits, with one message for each.

## 3. Write the message

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **Subject:** imperative mood ("add", not "added" or "adds"), lower case after the colon, no full stop, 72 characters or fewer for the whole line.
- **Body (optional):** add it only when the subject cannot explain the change on its own. Say what changed and why, not how, wrapped at 72 characters. Use short `-` bullets for several points.
- **Breaking changes:** add `!` after the type or scope and a `BREAKING CHANGE: <description>` footer. In this project, renaming a `localStorage` key or changing a saved field in a non-optional way counts as breaking.
- Base the message only on what the diff shows. Do not guess at motives that are not visible in the code.

## 4. Reply

Show the message in a single code block so it can be copied, then one line naming the files it covers. For example:

```
feat(menus): show carbon ranking podium on the menus page

- rank menus by impact per portion and list incomplete menus last
- add a fan-approval star to each menu card
```

Covers `app/menus/menu-dashboard.tsx`, `app/menus/fan-star.tsx` and `lib/menus.ts`.
