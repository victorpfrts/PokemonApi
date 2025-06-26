local:
	docker-compose down -v
	docker-compose up -d
	(npm run backend-dev) & \
	(npm run frontend-dev)

run:
	npm start