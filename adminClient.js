const { kafka } = require('./client')
const config = require('./config')
const admin = kafka.admin()


// Admin Client can create/delete topics
const adminClient = async () => {
    await admin.connect()
    await admin.createTopics({
        topics: [{
            topic: config.topic,
            numPartitions: config.numPartitions
        }],
        waitForLeaders: true,
    })
    await admin.disconnect()
}

adminClient()
    .catch((err) => {
        console.error(`Something  went wrong:\n${err}`);
        process.exit(1);
});