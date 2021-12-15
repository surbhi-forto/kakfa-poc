const { kafka } = require('./client')
const config = require('./config')
const producer = kafka.producer()

// Producer can produce new events to the topic
const kafkaProducer = async () => {
    await producer.connect()
    await producer.send({
        topic: config.topic,
        messages: [
            { name: 'Surbhi', age:27, rollno: 30 },
        ],
    })

    await producer.disconnect()
}

kafkaProducer()
    .catch((err) => {
        console.error(`Something went wrong:\n${err}`);
        process.exit(1);
});