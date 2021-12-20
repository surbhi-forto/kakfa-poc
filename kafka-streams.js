
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
        "event_cb": true,
        "compression.codec": "snappy",
        "api.version.request": true,
        "socket.keepalive.enable": true,
        "socket.blocking.max.ms": 100,
        "enable.auto.commit": false,
        "auto.commit.interval.ms": 100,
        "heartbeat.interval.ms": 250,
        "retry.backoff.ms": 250,
        "fetch.min.bytes": 100,
        "fetch.message.max.bytes": 2 * 1024 * 1024,
        "queued.min.messages": 100,
        "fetch.error.backoff.ms": 100,
        "queued.max.messages.kbytes": 50,
        "fetch.wait.max.ms": 1000,
        "queue.buffering.max.ms": 1000,
        "batch.num.messages": 10000,
        "security.protocol":"ssl",
        'broker.version.fallback': '0.10.2.1',
        'log.connection.close' : false
    },
    "tconf": {
        "auto.offset.reset": "earliest",
        "request.required.acks": 1
    },
    "batchOptions": {
        "batchSize": 5,
        "commitEveryNBatch": 1,
        "concurrency": 1,
        "commitSync": false,
        "noBatchCommits": false
    }
});

kafkaStreams.on("error", (error) => console.error(error));

const stream = kafkaStreams.getKStream(kafkaTopicName);

stream.forEach(message => console.log(message,'pppppppp'));


stream.start().then(() => {
    console.log("stream started, as kafka consumer is ready.");
}, error => {
    console.log("streamed failed to start: " + error);
});

