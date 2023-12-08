import { faker } from '@faker-js/faker';

const ingest = async ({ logger, qty, table }) => {
  const items = new Array(qty).fill().map(() => ({
    id: crypto.randomUUID(),
    origin: 'harperdb',
    content: faker.lorem.sentence({ max: 5, min: 3 }),
    origin_insert_time: Date.now(),
  }));

  try {
    const result = await table.put(items);
    logger.notify('inserted new harperdb records');
    return { error: false, result };
  } catch (e) {
    logger.error('error inserting new harperdb records', e);
    return { error: true, result: e };
  }
};

export default ingest;
