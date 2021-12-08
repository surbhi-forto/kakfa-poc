const config = {
    server: '<host:port>',
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: '<cluster api key>',
        password: '<cluster api secret>'
      },
    ssl: true,
    topic: '<topic>',
    groupId:'<groupId>',
    numPartitions: 1
}

module.exports = config