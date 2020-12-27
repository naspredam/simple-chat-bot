start-engine:
	echo 'Starting engine...'
	docker build -t simple-chat-bot-engine -f engine/Dockerfile ./engine
	docker-compose up -d engine

start-ui:
	echo 'Start user interface...'
	cd user-interface && npm start

start: start-engine start-ui
