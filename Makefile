.PHONY: clean
clean:
	rm -rf dist/

.PHONY: build
build: clean
	npm run build

.PHONY: docker
docker: build
	docker build -t marwanhawari/node-ts-express .

.PHONY: publish
publish: docker
	@echo ${DOCKERHUB_TOKEN} | docker login --username ${DOCKERHUB_USERNAME} --password-stdin
	docker push marwanhawari/node-ts-express