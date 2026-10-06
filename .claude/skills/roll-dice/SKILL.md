---
name: roll-dice
description: Roll dice using a random number generator. Use when asked to roll a die (d6, d20, etc.), roll dice, or generate a random dice roll.
---

To roll a die, run a command that generates a random number from 1 to the number of sides on the die. Replace `<sides>` with the number of sides (6 for a standard die, 20 for a d20).

On macOS or Linux:

```bash
echo $((RANDOM % <sides> + 1))
```

On Windows:

```powershell
Get-Random -Minimum 1 -Maximum (<sides> + 1)
```

Pick whichever command suits the user's operating system.
