BIN = ./node_modules/.bin

.PHONY: dev migrate rebuild

dev:
	$(BIN)/jetpack

migrate:
	$(BIN)/knex migrate:latest

rebuild:
	rm -rf database.sqlite
	make migrate
