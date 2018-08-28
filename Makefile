BIN = ./node_modules/.bin

.PHONY: dev migrate rebuild

dev:
	npx nodemon --watch ./server -e js,graphql $(BIN)/jetpack

build:
	NODE_ENV=production npx jetpack build

migrate:
	npx knex migrate:latest

rollback:
	npx knex migrate:rollback

deploy:
	npx pm2 deploy production

analyse: build
	npx source-map-explorer dist/client/bundle.js dist/client/bundle.js.map
