BIN = ./node_modules/.bin

.PHONY: dev migrate rebuild

dev:
	npx nodemon --watch ./server -e js,graphql $(BIN)/jetpack

migrate:
	npx knex migrate:latest

rebuild:
	rm -rf database.sqlite
	make migrate

deploy:
	npx pm2 deploy production
