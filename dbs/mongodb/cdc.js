import { MongoClient } from 'mongodb';

import config from '../../config.js';
const { mongodb } = config;

const cdc = async ({ logger, table }) => {
  const client = new MongoClient(mongodb.connectionString);

  try {
    const database = client.db(mongodb.databaseName);
    const collection = database.collection(mongodb.collectionName);
    const changeStream = collection.watch();

    for await (const { fullDocument } of changeStream) {
      const newRecord = {
        id: fullDocument._id.toString(),
        origin: 'mongodb',
        content: fullDocument.content,
        origin_insert_time: parseInt(fullDocument.origin_insert_time, 10),
      };
      logger.notify('received new mongodb record', newRecord);
      table.put(newRecord);
    }
    await changeStream.close();
  } catch (e) {
    await client.close();
    return e;
  } finally {
    await client.close();
  }
};

export default cdc;
