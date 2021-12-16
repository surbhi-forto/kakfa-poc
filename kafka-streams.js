const config = require('./config')
const {KafkaStreams, KafkaClient} = require("kafka-streams");
const kafkaTopicName = config.topic
const kafkaStreams = new KafkaStreams({
    kafkaHost: config.server
});

kafkaStreams.on("error", (error) => console.error(error));
const client = kafkaStreams.getKafkaClient(kafkaTopicName)
console.log(client)
const stream = kafkaStreams.getKStream(kafkaTopicName);
stream.forEach(message => console.log(message,'pppppppp'));
stream.start().then(() => {
    console.log("stream started, as kafka consumer is ready.");
}, error => {
    console.log("streamed failed to start: " + error);
});



setTimeout(() => {
    const p = kafkaStreams.getKStream(null)
    p.to(kafkaTopicName)
    p.start().then(
        () => {
            console.log('producer started')
            p.writeToStream(Math.random() + 'ppppp')
        },
        e => console.log('producer error', e)
    )
}, 3000)