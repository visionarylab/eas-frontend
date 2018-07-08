swagger:
	swagger-codegen generate -i https://raw.githubusercontent.com/etcaterva/eas-flask/master/eas/swagger.yaml -l javascript -o src/services/api/client/ -c src/services/api/codegen_options.json
swagger-local:
	swagger-codegen generate -i http://127.0.0.1:8000/api/swagger.yaml -l javascript -o src/services/api/client/ -c src/services/api/codegen_options.json