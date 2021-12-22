const { kafkaStreams } = require('./kafka-streams-client');
const config = require('./config')

kafkaStreams.on("error", (error) => {
    console.log("Error occured:", error.message);
});

const stream1 = kafkaStreams.getKStream("kafka-poc");
const stream2 = kafkaStreams.getKStream("kafka-poc-1");
const stream3 = kafkaStreams.getKStream("kafka-poc-2");

//merge will make sure any message that is consumed on any of the streams
//will end up being emitted in the merged stream
//checkout other operations: join (outer, left, inner), combine, zip
//for other merge options
const mergedStream = stream1.merge(stream2).merge(stream3);

stream3.forEach((message)=>{
    console.log("key", message.key ? message.key.toString("utf8") : null);
    console.log("value", message.value ? message.value.toString("utf8") : null);
    console.log("partition", message.partition);
    console.log("size", message.size);
    console.log("offset", message.offset);
    console.log("timestamp", message.timestamp);
    console.log("topic", message.topic);
    console.log("\n");
});


//await for 3 kafka consumer
//and 1 kafka producer to be ready
Promise.all([
    stream1.start(),
    stream2.start(),
    stream3.start(),
    mergedStream.to("kafka-poc-finale") //BE AWARE that .to()s on a merged stream are async
]).then(_ => {
    console.log('multiple stream started, as kafka consumer is ready.')
    //consume and produce for 5 seconds
    setTimeout(kafkaStreams.closeAll.bind(kafkaStreams), 10000);
});