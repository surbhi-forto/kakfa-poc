const config = {
    server: 'pkc-4r297.europe-west1.gcp.confluent.cloud:9092',
    sasl: {
        mechanism: 'PLAIN', // scram-sha-256 or scram-sha-512
        username: 'A67HUGAGJ7M63HWQ',
        password: 'YWvgHlyKujY6nOL1O9EgxeokO9HcSwjTWTgQei5InzhxCWLs6oA/DFaoqlsdlwnu'
      },
    ssl: true,
    topic: 'kafka-poc',
    groupId:'test-group',
    numPartitions: 1,
    clientId: 'kafkajs'
}

module.exports = config