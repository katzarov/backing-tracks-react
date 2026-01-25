# https://unix.stackexchange.com/questions/235223/makefile-include-env-file
define	setup_env
	$(eval ENV_FILE := $(1))
    @echo " - setup env $(ENV_FILE)"
    $(eval include $(1))
    $(eval export sed 's/=.*//' $(1))
endef

.PHONY: loadEnvVars
loadEnvVars:
	$(call setup_env, .env.local)

.PHONY: bti-local
bti-local:
# todo fix? I might just throw the whole app in a pnpm monorepo so skipping fixing this right now
# https://pnpm.io/cli/link#whats-the-difference-between-pnpm-link-and-using-the-file-protocol
# 	pnpm ? file:../backing-tracks-isomorphic

.PHONY: bti-reg
bti-reg:
# todo fix? I might just throw the whole app in a pnpm monorepo so skipping fixing this right now
# 	pnpm add ? backing-tracks-isomorphic@latest

.PHONY: build
build: loadEnvVars
	docker	build	\
		--build-arg="VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}"	\
		--build-arg="VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}"	\
		--build-arg="VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}"	\
		--build-arg="VITE_API=${VITE_API}"	\
		--build-arg="VITE_USE_S3_TO_DOWNLOAD_TRACK=${VITE_USE_S3_TO_DOWNLOAD_TRACK}"	\
		--tag	backing_tracks-react	.

# https://docs.docker.com/reference/cli/docker/container/run/#publish
.PHONY: run
run:
	docker	rm	-f	backing_tracks-react-container
	docker	run	--name backing_tracks-react-container -p 8080:8080	backing_tracks-react

.PHONY: clean
clean:
	docker	rm	-f	backing_tracks-react-container
	docker	rmi	-f	backing_tracks-react