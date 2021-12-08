const { kafka } = require('./client')
const config = require('./config')
const consumer = kafka.consumer({ groupId: config.groupId })

// Consumer can consume new events from the topic
const kafkaConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: config.topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })
}

kafkaConsumer()
    .catch((err) => {
        console.error(`Something went wrong:\n${err}`);
        process.exit(1);
});