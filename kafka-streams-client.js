
const config = require('./config')
const { KafkaStreams } = require("kafka-streams");

const kafkaStreams = new KafkaStreams({    
    "noptions": {
        "metadata.broker.list": config.server,
        "group.id": config.groupId,
        "client.id": config.clientId,
        "sasl.mechanisms":config.sasl.mechanism,
        "sasl.username": config.sasl.username,
        "sasl.password": config.sasl.password,
        "security.protocol":config.protocol
    }
});

module.exports = {
    kafkaStreams
}