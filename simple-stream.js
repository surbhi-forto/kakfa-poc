const { kafkaStreams } = require('./kafka-streams-client');
const config = require('./config')
const kafkaTopicName = config.topic


kafkaStreams.on("error", (error) => console.error(error));

const stream = kafkaStreams.getKStream(kafkaTopicName);

stream.forEach((message)=>{
    console.log("key", message.key ? message.key.toString("utf8") : null);
    console.log("value", message.value ? message.value.toString("utf8") : null);
    console.log("partition", message.partition);
    console.log("size", message.size);
    console.log("offset", message.offset);
    console.log("timestamp", message.timestamp);
    console.log("topic", message.topic);
    console.log("\n");
});

stream
    .sumByKey("key", "value", true)
    .map(kv => kv.key + " " + kv.sum)
    .tap(kv => console.log(kv, 'surbhi'))

stream.start().then(() => {
    console.log("stream started, as kafka consumer is ready.");
    //wait a few ms and close all connections
    // setTimeout(kafkaStreams.closeAll.bind(kafkaStreams), 10000);
}, error => {
    console.log("streamed failed to start: " + error);
});

