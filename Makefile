run:
	docker compose -f ./build/docker-compose.yml build
	docker compose -f ./build/docker-compose.yml up

test:
	docker compose -f ./build/docker-compose.test.yml build
	docker compose -f ./build/docker-compose.test.yml run api
