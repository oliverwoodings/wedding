BIN = ./node_modules/.bin

.PHONY: start

start:
	nodemon --watch app/server -e js,graphql $(BIN)/jetpack

migrate:
	$(BIN)/knex migrate:latest

rebuild:
	rm -rf database.sqlite
	make migrate
