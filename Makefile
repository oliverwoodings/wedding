.PHONY: dev migrate rebuild

dev:
	npx jetpack

build:
	npx jetpack build

migrate:
	npx knex migrate:latest

rollback:
	npx knex migrate:rollback

deploy:
	npx pm2 deploy production

analyse: build
	npx source-map-explorer dist/client/bundle.js dist/client/bundle.js.map
