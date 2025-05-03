# stacktrace-mcp

## Getting started

1. Clone the repo
2. Run `pnpm i` for install
3. Run `pnpm build` for building the server
4. Add the local mcp server file path to your MCP-supported app (VSCode Copilot, etc):
   ```json
   // settings.json
   "mcp": {
       "servers": {
       "stacktrace-mcp-server": {
           "type": "stdio",
           "command": "node",
           "args": [
                "<your-path-to>\/stacktrace-mcp\/dist\/mcp_server.cjs"
           ]
       }
       }
   }
   ```
5. Make sure the mcp tool is already enabled
6. Copy your error stack trace to the prompt chat! That's it
