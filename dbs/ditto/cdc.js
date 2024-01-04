import { init, Ditto } from '@dittolive/ditto';

import config from '../credentials/credentials.js';
const { ditto } = config;
let client;

const cdc = async ({ logger, table }) => {
  try {
    await init();
    client = new Ditto(ditto);
    client.store
      .collection('edgetl')
      .find('isDeleted == false')
      .subscribe((docs, event) => {
        logger.notify(docs, event);
        logger.notify('received new ditto record', docs);
        // table.put(newRecord);
      });
  } catch (e) {
    logger.error('error creating ditto consumer', e);
    return e;
  }
};

export default cdc;
