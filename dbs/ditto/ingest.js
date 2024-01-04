import { init, Ditto } from '@dittolive/ditto';
import { faker } from '@faker-js/faker';

import config from '../credentials/credentials.js';
const { ditto } = config;

const ingest = async ({ logger, qty }) => {
  // Initialize the Ditto module
  await init();

  // Create a Ditto context:
  const identity = { type: 'onlinePlayground', appID: ditto.appID, token: ditto.token };
  const client = new Ditto(identity, 'playground');

  // Get hold of a collection:
  const edgetl = client.store.collection('edgetl');

  // Insert an entry:
  const fordBlack = { _id: 'ford-black-123', model: 'Ford', color: 'black' };
  const upsert = await edgetl.upsert(fordBlack);
  logger.notify('upsert', upsert);

  // Find an entry by ID:
  const foundFordBlack = await edgetl.findByID('ford-black-123');
  logger.notify('foundFordBlack', foundFordBlack);

  // Remove an entry:
  const result2 = await edgetl.findByID('ford-black-123').remove();

  // Done:
  logger.notify('Done, over and out.', result2);

  /*
  const keys = [];
  const args = {};

  new Array(qty).fill().map((v, i) => {
    keys.push(`(:record${i})`);
    args[`record${i}`] = {
      content: faker.lorem.sentence({ max: 5, min: 3 }),
      origin_insert_time: Date.now().toString(),
    };
  });
  const statement = `INSERT INTO ${ditto.tableName} DOCUMENTS ${keys.join(',')}`;

  const body = JSON.stringify({ statement, args });

  logger.notify(body);

  try {
    const response = await fetch({
      url: `https://${ditto.appID}.cloud.ditto.live/api/v4/store/execute`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-DITTO-CLIENT-ID': ditto.appID,
        Authorization: ditto.token,
      },
      body,
    });
    const result = await response.json();
    logger.notify('inserted new ditto record', result);
    return { error: false, result };
  } catch (e) {
    logger.error('error inserting new ditto records', e);
    return { error: true, result: e };
  }
  */
};

export default ingest;
