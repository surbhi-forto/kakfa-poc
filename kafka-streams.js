
const config = require('./config')
const { KafkaStreams } = require("kafka-streams");
const kafkaTopicName = config.topic

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

kafkaStreams.on("error", (error) => console.error(error));

const stream = kafkaStreams.getKStream(kafkaTopicName);

stream.forEach(message => console.log(message.value.toString("utf8"),'pppppppp'));


stream.start().then(() => {
    console.log("stream started, as kafka consumer is ready.");
}, error => {
    console.log("streamed failed to start: " + error);
});

