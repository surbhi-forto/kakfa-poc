const { kafkaStreams } = require('./kafka-streams-client');
const config = require('./config')

kafkaStreams.on("error", (error) => {
    console.log("Error occured:", error.message);
});

//creating a ktable requires a function that can be
//used to turn the kafka messages into key-value objects
//as tables can only be built on key-value pairs
const table = kafkaStreams.getKTable("kafka-poc", keyValueMapperEtl);

function keyValueMapperEtl(kafkaMessage) {
    const value = kafkaMessage.value.toString("utf8");
    const elements = value.toLowerCase().split(" ");
    return {
        key: elements[0],
        value: elements[1]
    };
}

//consume the first 100 messages on the topic to build the table
table
    .consumeUntilCount(100, () => {
        //fires when 100 messages are consumed

        //the table has been built, there are two ways
        //to access the content now

        //1. as map object
        table.getTable().then(val => {
            console.log(val);
        });

        //2. as replayed stream
        table.forEach(row => {
            console.log(row);
        });

        //you can replay as often as you like
        //replay will simply place every key-value member
        //of the internal map onto the stream once again
        table.replay();

        //kafka consumer will be closed automatically
    })
    //be aware that any operator you append during this runtime
    //will apply for any message that is on the stream (in change-log behaviour)
    //you have to consume the topic first, for it to be present as table
    .atThroughput(50, () => {
        //fires once when 50 messages are consumed
        console.log("consumed 50 messages.");
    });

//start the stream/table
//will emit messages as soon as
//kafka consumer is ready
table.start();
