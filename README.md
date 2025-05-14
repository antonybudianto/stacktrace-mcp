[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/antonybudianto-stacktrace-mcp-badge.png)](https://mseep.ai/app/antonybudianto-stacktrace-mcp)

# stacktrace-mcp

Simple JS Stacktrace MCP for getting the nearest error location from JavaScript bundle URL 
and lets an LLM checks if it matches anything in the current codebase.

> Designed for non-sourcemap users.

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
