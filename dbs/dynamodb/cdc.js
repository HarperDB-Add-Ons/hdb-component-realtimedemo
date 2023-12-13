import DynamoDBStream from 'dynamodb-stream';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBStreams } from '@aws-sdk/client-dynamodb-streams';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';

import config from '../credentials/credentials.js';
const { dynamodb } = config;

const cdc = async ({ logger, table }) => {
  logger.notify(dynamodb);
  const ddb = new DynamoDB({
    region: dynamodb.region,
    credentials: fromIni({ filepath: dynamodb.credentialsFilepath }),
  });
  const ddbStream = new DynamoDBStream(new DynamoDBStreams(), dynamodb.streamArn, unmarshall);

  await ddbStream.fetchStreamState();
  const { Items } = await ddb.scan({ TableName: dynamodb.tableName });
  Items.map(unmarshall);

  // parse results and store in local state
  const watchStream = () => {
    setTimeout(() => ddbStream.fetchStreamState().then(watchStream), 500);
  };

  watchStream();

  ddbStream.on('insert record', (data) => {
    const newRecord = { origin: 'dynamodb', ...data };
    logger.notify('received new dynamodb record', newRecord);
    table.put(newRecord);
  });
};

export default cdc;
