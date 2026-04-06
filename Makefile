COMPOSE=docker compose -f compose.yaml

start:
	$(COMPOSE) up

start-d:
	$(COMPOSE) up -d

	stop:
	$(COMPOSE) down

build:
	$(COMPOSE) up --build

stop:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

exec:
	$(COMPOSE) exec frontend bash
