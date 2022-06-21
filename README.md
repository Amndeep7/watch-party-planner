# Watch Party Planner

Discord bot to help plan watch parties by leveraging the Discord and StrawPoll.com APIs.

## Development
`docker build -t watch-party-planner-dev:latest -f Dockerfile.dev .`

`docker run -it --mount src="$(pwd)",target=/app,type=bind --user "$UID:${GROUPS[0]}" watch-party-planner-dev:latest /bin/bash`

## Production
`docker build -t watch-party-planner-prod:latest -f Dockerfile.prod .`

`docker run -it watch-party-planner-prod:latest`
