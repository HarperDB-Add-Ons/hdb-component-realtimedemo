import dynamodbIngest from './dbs/dynamodb/ingest.js';
import dynamodbCDC from './dbs/dynamodb/cdc.js';

import mongodbIngest from './dbs/mongodb/ingest.js';
import mongodbCDC from './dbs/mongodb/cdc.js';

import datastaxIngest from './dbs/datastax/ingest.js';
import datastaxCDC from './dbs/datastax/cdc.js';

import harperdbIngest from './dbs/harperdb/ingest.js';

export class api extends tables.edgetl {
  subscribe(options) {
    if (options) options.omitCurrent = true;
    else options = { omitCurrent: true };
    return super.subscribe(options);
  }
  async post({ qty, origin }) {
    let result;
    if (origin === 'dynamodb') {
      result = await dynamodbIngest({ logger, qty });
    } else if (origin === 'mongodb') {
      result = await mongodbIngest({ logger, qty });
    } else if (origin === 'datastax') {
      result = await datastaxIngest({ logger, qty });
    } else if (origin === 'harperdb') {
      result = await harperdbIngest({ logger, qty, table: tables.edgetl });
    }
    return result;
  }
  async delete() {
    const result = await super.delete({
      conditions: [{ attribute: 'origin_insert_time', value: Date.now(), comparator: 'less_than' }],
    });
    return { result };
  }
}

if (server.workerIndex === 1) {
  dynamodbCDC({ logger, table: tables.edgetl });
  mongodbCDC({ logger, table: tables.edgetl });
  datastaxCDC({ logger, table: tables.edgetl });
}
