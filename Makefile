swagger:
	swagger-codegen generate -i https://github.com/etcaterva/eas-backend/blob/master/swagger.yaml -l javascript -o src/services/api/client/ -c src/services/api/codegen_options.json
swagger-local:
	swagger-codegen generate -i src/services/api/custom_swagger.yaml -l javascript -o src/services/api/client/ -c src/services/api/codegen_options.json
swagger-v3: 
	openapi-generator generate -i https://github.com/etcaterva/eas-backend/blob/master/swagger.yaml -g javascript -o src/services/api/client/ -c src/services/api/codegen_options.json


	