start-engine:
	echo 'Starting engine...'
	docker build -t simple-chat-bot-engine -f engine/Dockerfile ./engine

start-ui:
	echo 'Start user interface...'
	pushd user-interface
	npm run dev

start: start-engine start-ui
