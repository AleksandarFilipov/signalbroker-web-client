# signal-broker web client


This front-end client for the Signal Broker is designed to be simple and easy. Once you connect to the Signal Broker envoy, select and save signals you want to subscribe to, click the traffic icon to automatically view realtime adaptive visualization of data. This webapp uses the gRPC library to communicate to Signal Broker through Envoy.


## Available features

* Bus, frame and signal monitoring
* Adaptive charting based on activity over time
* Customizable line or bar charts
* Display CAN/LIN/Flexray Buses, Frames and Signals in a searchable, hierachical tree
* Automatic realtime Frame and Signal recording
* Realtime search of Buses, Frames and Signals within a tree hierarchy
* Responsive design for all screen sizes
* Cross-platform compatible with modern browsers
* Adjustable filter to hide redundant data
* Adjustable data history length
* Historical data table display per Signal and Frame
* Dark theme (customizable interface)
* Realtime Hex/Decimal/Binary converter

## Future development
* Configurable OBD Diagnostics
* State persistence using browser storage
* Import/Export functionality
* Configurable presets
* Realtime lag/delay calculation and display
* Charts with multiple data sources
* Chart editor for multi-data charts
* External peripheral support
* Control via smartphone sensors such as accelerometers
* Signal chain creation, graphical programming support
* Progressive Webapp support
* Internationalization (translation via i18)

# Troubleshooting

### The Broker Envoy is offline

When you first open the webapp you may not connect to the Envoy if the target IP is incorrect. Locate the "Broker Envoy" button at the bottom of the screen. If it is red and you are certain the Envoy is online, then you are not connected to the Broker Envoy and you need to change the IP address by clicking on this button.

# Known limitations
### Client-side performance
To prevent an overload, try to limit your total frame/signal subscriptions to a more manageable number.

### Server-side performance
When executing multiple simultaneous requests, the Signal Broker may crash. If this is the case, the front-end client will still tell you it is online, because the Envoy indeed is online. However, the Signal Broker connected to the hardware may need a restart if Subscriptions are unresponsive, yet the client is still able to list signals and shows that the IP connection to the Envoy is Online. A simple fix would be to restart the Signal Broker.



# Development

You should be familiar with HTML, Javascript and VueJS to configure the web client. This client is in active development and any constructive ideas are welcome!

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```
If using the "Cowboy" server, you will want to copy the generated `dist` folder to the signalbroker-web-client repo `signalbroker-web-client/priv/` and repace the existing files in that folder.

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
