import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
  dynamodb: {
    region: 'us-west-2',
    tableName: 'XXXX',
    streamArn: 'arn:aws:dynamodb:us-west-2:XXXX',
    credentialsFilepath: path.join(__dirname, 'aws.credentials'),
  },
  mongodb: {
    connectionString: 'mongodb+srv://XXXX',
    databaseName: 'XXXX',
    collectionName: 'XXXX',
  },
  datastax: {
    tableName: 'XXXX',
    clientId: 'XXXX',
    secret: 'XXXX',
    token: 'XXXX', // pulsar token
    serviceUrl: 'pulsar+ssl://XXXX:6651',
    topic: 'persistent://XXXX',
    subscription: 'edgetl-demo',
    secureConnectBundle: path.join(__dirname, 'datastax.secureconnect.zip'),
  },
};
