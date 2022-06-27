# Watch Party Planner

Discord bot to help plan watch parties by leveraging the Discord and StrawPoll.com APIs.

## Development
`docker build -t watch-party-planner-dev:latest -f Dockerfile.dev .`

`docker run -it --mount src="$(pwd)",target=/app,type=bind --user "$(id -u):$(id -g)" --env-file .env watch-party-planner-dev:latest /bin/bash`

## Production
`docker build -t watch-party-planner-prod:latest -f Dockerfile.prod .`

`docker run -it --env-file .env watch-party-planner-prod:latest`

## Notes
### Bot configuration
Make sure to save `.env.template` as `.env` and fill it in with the appropriate values.  Please keep in mind that the `.env` file will be keeping track of secrets like your StrawPoll.com API key.  THIS IS NOT SECURE!  What one should actually do is use some sort of secrets manager like Hashicorp Vault or Docker Swarm Secrets.  I'm doing it in this insecure way since I have acknowledged the security risk and deemed it acceptable to myself - you might not make that same decision!  Specifically, these secrets will be visible to the host side by anyone/thing with the appropriate permissions to `inspect`/`exec` a running Docker container and by anyone/thing that can access environment variables on the container side (such as the code for this bot).  There might be other places where secrets can leak.  USE AT OWN RISK!

### Rebuild images
Remember to rebuild images every now and again by adding the `--pull` and `--no-cache` arguments to the build command every now and again.
