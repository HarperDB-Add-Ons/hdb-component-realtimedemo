export default {
  dynamodb: {
    region: 'us-west-2',
    tableName: 'XXXX',
    streamArn: 'arn:aws:dynamodb:us-west-2:XXXX',
  },
  mongodb: {
    connectionString: 'mongodb+srv://XXXX',
    databaseName: 'XXXX',
    collectionName: 'XXXX',
  },
  datastax: {
    tableName: 'XXXX',
    secureConnectBundle: 'XXXX', // absolute path
    clientId: 'XXXX',
    secret: 'XXXX',
    token: 'XXXX', // pulsar token
    serviceUrl: 'pulsar+ssl://XXXX:6651',
    topic: 'persistent://XXXX',
    subscription: 'edgetl-demo',
  },
};
