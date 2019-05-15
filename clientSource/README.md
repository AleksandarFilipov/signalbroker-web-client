# signal-broker web client


This front-end client for the Signal Broker is designed to be simple and easy. Once you connect to the Signal Broker envoy, select and save signals you want to subscribe to, click the traffic icon to automatically view realtime adaptive visualization of data. This webapp uses a gRPC library to communicate with the Signal Broker.


## Available features

* Bus, frame and signal monitoring
* Adaptive charting based on activity over time
* Customizable line or bar chart visualizations per Signal
* Display CAN/LIN/Flexray Buses, Frames and Signals in a searchable, hierachical tree
* Automatic realtime Frame and Signal recording
* Realtime search of Buses, Frames and Signals within a tree hierarchy
* Responsive design for all screen sizes
* Cross-platform compatible with modern browsers
* Adjustable filter to hide redundant data
* Adjustable data history length
* Historical data table display per Signal and Frame
* Dark theme (customizable interface)

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

When you first open the webapp you may not connect to the Envoy if the target IP is incorrect. Locate "Broker Envoy" at the bottom of the screen. If it is red, then you are not connected to the Broker Envoy, and you might need to change the IP. You can do this by clicking on the IP.

# Known limitations
### Client-side performance
Use caution when simultaneously working with large amounts of signals. The web client has been tested with hundreds of simultaneous visualizations and has been known to hang the browser with over 50 signals. For this reason, try to limit your total subscriptions to a smaller, more manageable number.

### Server-side performance
When executing large simultaneous requests, the Signal Broker may crash. If this is the case, the front-end client will still tell you it is online, because the Envoy indeed is online. However, the Signal Broker connected to the hardware may need a restart if Subscriptions are unsuccesful, yet the client is still able to list signals and shows that the IP connection is Online.



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
