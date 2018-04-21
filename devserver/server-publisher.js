"use strict"
const Stomp = require('stompjs')
const util = require('util')

const startPrices = {
  gbpusd: 1.4587,
  gbpeur: 1.288,
  gbpaud: 1.9107,
  usdeur: 0.883,
  gbpjpy: 158.29,
  usdjpy: 108.505,
  eurjpy: 122.91,
  gbpchf: 1.4126,
  euraud: 1.4834,
  eurchf: 1.0969,
  eurcad: 1.4214,
  gbpcad: 1.8303
}

const currencies = Object.keys(startPrices)
const publicData = {}
const internal = {}
for (let ccy in startPrices) {
  const spread = Math.random() * 0.05
  const mid = startPrices[ccy]
  internal[ccy] = mid
  publicData[ccy] = {
    name: ccy,
    bestBid: mid - mid * (spread / 2),
    bestAsk: mid + mid * (spread / 2),
    openBid: mid - mid * (spread / 2),
    openAsk: mid + mid * (spread / 2),
    lastChangeAsk: 0,
    lastChangeBid: 0
  }
}

exports.start = function(stompUrl) {
  var client = Stomp.overWS(stompUrl);
  client.connect({}, function() {
    util.log("Fake FX data service connected: serving price updates on stomp topic /fx/prices")
    setInterval(function tick() {
        for (let i = 0; i < Math.random() * 5; i++) {
          const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]
          const mid = internal[randomCurrency]
          const spread = Math.random() * 0.05
          const diff = (Math.random() * 0.08 - 0.04) * mid
          const newMid = (mid + diff)
          const bid = newMid - newMid * (spread / 2)
          const ask = newMid + newMid * (spread / 2)
          const data = publicData[randomCurrency]
          data.lastChangeBid = bid - data.bestBid
          data.lastChangeAsk = ask - data.bestAsk
          data.bestBid = bid
          data.bestAsk = ask

          client.send("/fx/prices", {priority: 9}, JSON.stringify(data))
        }
      }, 1000)
  }, function() {
    util.log('Error starting Fake FX data service', arguments)
  })
}
