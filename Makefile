# https://unix.stackexchange.com/questions/235223/makefile-include-env-file
define	setup_env
	$(eval ENV_FILE := $(1))
    @echo " - setup env $(ENV_FILE)"
    $(eval include $(1))
    $(eval export sed 's/=.*//' $(1))
endef

loadEnvVars:
	$(call setup_env, .env.local)

build: loadEnvVars
	docker	build	\
		--build-arg="VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}"	\
		--build-arg="VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}"	\
		--build-arg="VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}"	\
		--build-arg="VITE_API=${VITE_API}"	\
		--build-arg="VITE_USE_S3_TO_DOWNLOAD_TRACK=${VITE_USE_S3_TO_DOWNLOAD_TRACK}"	\
		--tag	react-build-prod	.

# https://docs.docker.com/reference/cli/docker/container/run/#publish
run:
	docker	rm	-f	react-build-prod-container
	docker	run	--name react-build-prod-container -p 8080:8080	react-build-prod

clean:
	docker	rm	-f	react-build-prod-container
	docker	rmi	-f	react-build-prod