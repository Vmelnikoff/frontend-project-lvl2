
install:
	npm install

publish:
	npm publish --dry-run

link:
	npm unlink
	npm link

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

