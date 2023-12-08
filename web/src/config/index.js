export default {
  hdbUrl: `${window.location.hostname}:9926`,
  hdbSSL: window.location.protocol === 'https:',
  hdbAuth: 'Basic SERCX0FETUlOOnBhc3N3b3Jk',
  hdbLocations: ['LA', 'DC', 'Paris', 'Tokyo'],
  hdbResource: 'api',
  publishQty: 3,
  originDBs: [
    {
      label: 'DynamoDB',
      key: 'dynamodb',
    },
    {
      label: 'Atlas',
      key: 'mongodb',
    },
    {
      label: 'DataStax',
      key: 'datastax',
    },
    {
      label: 'HarperDB',
      key: 'harperdb',
    },
  ],
  subscriberTypes: ['MQTTWS', 'SSE', 'WS', 'REST'],
};
