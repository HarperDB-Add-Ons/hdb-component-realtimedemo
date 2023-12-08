import { BatchWriteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';
import { faker } from '@faker-js/faker';

import config from '../../config.js';
const { dynamodb } = config;

const ingest = async ({ logger, qty }) => {
  const items = new Array(qty).fill().map(() => ({
    PutRequest: {
      Item: {
        id: { S: crypto.randomUUID() },
        content: { S: faker.lorem.sentence({ max: 5, min: 3 }) },
        origin_insert_time: { N: Date.now().toString() },
      },
    },
  }));

  const client = new DynamoDBClient({
    region: dynamodb.region,
    credentials: fromIni(),
  });

  const command = new BatchWriteItemCommand({
    RequestItems: {
      'edgetl-demo': items,
    },
  });

  try {
    const result = await client.send(command);
    logger.notify('inserted new dynamodb record', result);
    return { error: false, result };
  } catch (e) {
    logger.error('error inserting new dynamodb records', e);
    return { error: true, result: e };
  }
};

export default ingest;
