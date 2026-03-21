## Code Search & Analysis

### CodeGraphContext MCP Setup

The project uses CodeGraphContext via MCP for advanced code analysis. The server is already configured in `.mcp.json` and indexed.

**If MCP server fails to start:**

1. Check if KüzuDB database is locked:
```powershell
Remove-Item -Path "$env:USERPROFILE\.codegraphcontext\kuzudb" -Recurse -Force
```

2. Verify MCP server is running:
```bash
cgc mcp tools  # Lists all available tools
```

3. Restart the server if needed

### When to Use MCP Tools vs Grep/Read

| Task | Tool | Why |
|------|------|-----|
| Find all callers of a function | `analyze_code_relationships` (find_callers) | Faster than manual tracing |
| Find who calls buildMedia? | `analyze_code_relationships` (find_callees) | Shows complete call tree instantly |
| Search for keyword/symbol | `find_code` | Better than grep for code patterns |
| Understand call chains | `analyze_code_relationships` (call_chain) | Full context in one query |
| Understand codebase structure | `get_repository_stats` | Overview before diving deep |
| Read a specific file | Grep / Read (manual) | Direct control, small files |

**Rule of thumb:** If you're tracing relationships across files, use MCP. For reading specific files, use Read/Grep.

### Available MCP Query Types

Use with `analyze_code_relationships`:
- `find_callers` — who calls this
- `find_callees` — what this calls
- `find_all_callers` — all callers recursively
- `find_all_callees` — all callees recursively
- `class_hierarchy` — inheritance chains
- `find_importers` — who imports this module
- `call_chain` — full call path
- `module_deps` — module dependencies
