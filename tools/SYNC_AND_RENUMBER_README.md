SYNC + RENUMBER tool
====================

What
----
This repository includes a safe synchronizer that can copy ID mappings from a canonical source file into one or more targets and optionally renumber the canonical IDs so every copy uses the same sequence.

Files
-----
- tools/sync_and_renumber.js — Node.js implementation (dry-run by default).
- sync_and_renumber.bat — Workspace-level Windows wrapper (calls the Node script).

Typical usage (PowerShell)
--------------------------
- Dry-run (preview mapping):
  .\sync_and_renumber.bat --source testData_complete.js --targets src/data/testData_complete.js,924.html --renumber

- Apply changes (write files and create backups):
  .\sync_and_renumber.bat --source testData_complete.js --targets src/data/testData_complete.js,924.html --renumber --apply

Notes
-----
- The tool is safe by default (dry-run). When you pass --apply it writes files and creates timestamped backups.
- Use --no-backup to skip backups (not recommended).
