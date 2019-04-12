# Signalbroker web client

HTTP server with static file serving and Core system websocket API.

The webserver used in thes project is [Cowboy](https://github.com/ninenines/cowboy).


## Run

Before starting, the [signalbroker](https://github.com/volvo-cars/signalbroker-server) must be running.

- [Install elixir](https://elixir-lang.org/install.html).
- Clone this repository.
 of the box).
- Start the software by doing.

```
mix deps.get
iex -S mix
```
if your signalbroker server is running on another machine do:
```
mix deps.get
SIGNAL_SERVER_HOST_NAME=10.251.177.205 iex -S mix
```


## grpc web
Point your browser to [http://you_envoy_machine_ip:8080/](http://localhost:8080/). Once your web client is started click the red red field in the status bar at the bottom. Configure it by setting your Envoy ip, http://[your_envoy_server]:8081

in order to get connection working with signal_server you need envoy. Check [readme](configuration/grpc_web/README.md) on how to get started.


## simpler less capable option

To access the *Websocket client* UI point your web browser to [http://localhost:8080/websocket_demo/web_car.html](http://localhost:8080/websocket_demo/web_car.html).
The controlls being displayed are hardcoded in a javascript file `service_client/priv/static_files/js/web_car.js`.

## Websocket API

The API is now documentet at this point.
For a working sample of how to use the code go to `priv/websocket_demo/js/web_car.js`.
More importantly, look at the *Websocket* section.

# Front-end client configuration

If you want to customize the web client, follow these instructions.

1. See [readme libraryCompiler](libraryCompiler/README.md) to take the GRPC generated files and bundle them into a javascript library. You will need to run this again anytime you make changes to the GRPC files. Changes in the front-end (clientSource) might be needed as well if functions are added, removed, or renamed. DO NOT modify the generated files or the `api.js` file generated by webpack.
2. Then see [readme clientSource](clientSource/README.md) to configure the front-end web client built with VueJS which is preconfigured to use the library from step 1. The resulting production build can be hosted on a web server of your choice or you may prefer to use the development server by running `yarn serve`. If you intend to host the production version on `Cowboy`, then copy the generated `/dist` folder to `signalbroker-web-client/priv/` after running `yarn build`. Remember to point the web client to the correct Envoy IP.
3. You should now be able to point your browser to the webserver, select some frames and/or signals and see some charted traffic!

# Help us improve!

The front-end web client is in active development and would appreciate your feature suggestions or bug reports. File them as issues in this repository :)