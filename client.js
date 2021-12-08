const { Kafka } = require('kafkajs')
const config = require('./config')
const kafka = new Kafka({
    brokers: [config.server],
    ssl: config.ssl,
    sasl: config.sasl,
})
module.exports = {
    kafka
}