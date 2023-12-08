export default {
  hdbUrl: `${window.location.hostname}:9926`,
  hdbSSL: window.location.protocol === 'https:',
  hdbAuth: 'Basic SERCX0FETUlOOnBhc3N3b3Jk',
  hdbLocations: ['localhost:9926'],
  hdbResource: 'api',
  publishQty: 3,
  originDBs: [
    {
      label: 'AWS DynamoDB',
      key: 'dynamodb',
    },
    {
      label: 'MongoDB Atlas',
      key: 'mongodb',
    },
    {
      label: 'DataStax Cassandra',
      key: 'datastax',
    },
  ],
  subscriberTypes: ['MQTTWS', 'SSE', 'WS', 'REST'],
};
