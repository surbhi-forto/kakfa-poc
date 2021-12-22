const { kafka } = require('./client')
const config = require('./config')
const consumer = kafka.consumer({ groupId: config.groupId })

// Consumer can consume new events from the topic
const kafkaConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'kafka-poc-1', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            }, partition, topic)
        },
    })
}

kafkaConsumer()
    .catch((err) => {
        console.error(`Something went wrong:\n${err}`);
        process.exit(1);
});