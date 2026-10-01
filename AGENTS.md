## Development servers

- Always use Portly (`portly ...`) to start, stop, restart, inspect, or keep local development servers running.
- Start with `portly status` and reuse a healthy managed server.
- For bounded builds, checks and previews, use `portly temp '<command>' --path <folder> --timeout 30m`, then `portly wait <job-id>`.
- Never launch persistent development servers directly or through another supervisor.
