"use strict"

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require('path')
const Mq = require('../blackcatmq')
const http = require('http')
const util = require('util')
const serveDirectory = process.cwd()
const serverPublisher = require('./server-publisher')

function addToAllEntries(config, extra) {
  if(typeof config.entry === "object" && !Array.isArray(config.entry)) {
    Object.keys(config.entry).forEach(function(key) {
      config.entry[key] = extra.concat(config.entry[key])
    })
  } else {
    config.entry = extra.concat(config.entry)
  }
}

function report(devServerConfig) {
  util.log("Content is served from " + devServerConfig.contentBase)
  if(devServerConfig.historyApiFallback) {
    util.log("404s will fallback to %s", devServerConfig.historyApiFallback.index || "/index.html")
  }
}

const outputPath = path.join(serveDirectory, 'site')
const packageDef = require(path.join(serveDirectory, "package.json"))
const entries = [path.resolve(serveDirectory, packageDef.main)]
const config = require('./config/webpack-dev')(entries, outputPath)
const devServerConfig = config.devServer
if (devServerConfig.inline) {
  const devClient = [
    require.resolve("webpack-dev-server/client") + "?http://" + devServerConfig.host + ":" + devServerConfig.port
  ]
  if(devServerConfig.hot) {
    devClient.push(require.resolve("webpack/hot/dev-server"))
  }
  addToAllEntries(config, devClient)
}
const compiler = webpack(config)

const webpackServer = new webpackDevServer(compiler, config.devServer)
webpackServer.listen(devServerConfig.port, devServerConfig.host, function(err) {
  if(err) { throw err }
  const server = webpackServer.listeningApp
  const addr = server.address()
  util.log(util.format("Webpack dev server started on http://%s:%s/", addr.address, addr.port));

  report(devServerConfig)

  const mq = new Mq({
    protocol: 'websocket'
  }, server)
  mq.timerID = setInterval(function() { mq.timer(); }, mq.interval);

  serverPublisher.start('ws://localhost:8011/stomp')
})

