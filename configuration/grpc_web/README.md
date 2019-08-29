## Run envoy
from the docker folder.
```bash
sudo -E docker build --build-arg SIGNAL_SERVER_HOST_NAME=127.0.0.1 -t envoy:v1 .
```
start it
```bash
sudo docker run  -p 8080:8080 --net=host  envoy:v1
```
SIGNAL_SERVER_HOST_NAME should point to the machine where [signalbroker-server](https://github.com/volvo-cars/signalbroker-server) is hosted

## Start using the system

- Run the pre built [frontend, that is; iex -S mix](/README.md)
- Alternatively use the [generated](/configuration/grpc_web/generated) js files to access the grpc server using your web code.

### Reference, re-generate gRPC-web js files

inspiration from
https://github.com/grpc/grpc-web/ and https://hackernoon.com/interface-grpc-with-web-using-grpc-web-and-envoy-possibly-the-best-way-forward-3ae9671af67


proto files are avalible in: [signal_server/apps/grpc_service/proto_files/](https://github.com/volvo-cars/signalbroker-server/tree/master/apps/grpc_service/proto_files)

to re-generate files - or just grab the files from the generated folder

- git clone https://github.com/grpc/grpc-web.git
- make plugin
- make sure to copy protoc-gen-grpc-web to a discoverable path such as /user/local/bin

mkdir generated. Run the command from "this" directory!

```bash
protoc ./proto_files/*.proto -I./proto_files/ --js_out=import_style=commonjs:generated --grpc-web_out=import_style=commonjs,mode=grpcwebtext:generated
```
