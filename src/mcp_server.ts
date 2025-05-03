import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

// Handles communication via standard input/output
// This can be changed to other protocols that MCP supports
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

// Creates a new MCP server instance with a name and version
const server = new McpServer({
  name: 'stacktrace-mcp-server',
  version: '1.0.0',
})

const WINDOW_SIZE = 100
server.tool(
  'check-stacktrace',
  'check error stacktrace',
  { url: z.string(), column: z.number(), row: z.number(), windowSize: z.number() },
  async ({ url, row, column, windowSize = WINDOW_SIZE }) => {
    if (!url.startsWith('https://')) {
      return {
        content: [
          {
            type: 'text',
            text: `The URL is not supported. Please use a URL that starts with https://`,
          },
        ],
      }
    }
    const res = await fetch(url)
    if (!res.ok) {
      return {
        content: [
          {
            type: 'text',
            text: `Error response: ${res.status} ${res.statusText}`,
          },
        ],
      }
    }
    const text = await res.text()

    try {
      const lines = text.split('\n')
      const targetLine = lines[row - 1] || ''
      const start = Math.max(0, column - 1 - windowSize)
      const end = Math.min(targetLine.length, column - 1 + windowSize + 1)
      const subtext = targetLine.substring(start, end)
      return {
        content: [
          {
            type: 'text',
            text: subtext,
          },
        ],
      }
    } catch (err: unknown) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${(err as Error).message}`,
          },
        ],
      }
    }
  }
)

// Start the server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Echo MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
