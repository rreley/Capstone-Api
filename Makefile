##########

run-dev:
	ENV=dev docker-compose -f docker-compose-dev.yml up --build

stop-dev:
	ENV=dev docker-compose -f docker-compose-dev.yml stop

down-dev:
	ENV=dev docker-compose -f docker-compose-dev.yml down

##########

run-prod:
	ENV=production docker-compose up

stop-prod:
	ENV=production docker-compose stop

down-prod:
	ENV=production docker-compose down


##########

api-shell:
	docker exec -it rest-api /bin/sh

db-shell:
	docker exec -it capstone-api_db_1 /bin/sh

##########

prune:
	docker image prune -a



.PHONY: build run run-prod stop-prod \
		down-prod api-shell run-dev stop-dev down-dev \
		prune