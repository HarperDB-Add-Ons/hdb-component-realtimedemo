# HarperDB ActiveSync

A demonstration of HarperDB's ability to subscribe to changes in external databases and deliver REST and Real-Time interfaces across the edge.

---

### Prerequisites

You must enable HTTPS and CORS in HarperDB's config (default: ~/hdb/harperdb-config.yaml) to accept requests from specified domain over a secure connection. 

- Update the `http` section's `securePort` attribute to `9926`, and set the `port` attribute to `null`. By default, HarperDB uses a self-signed certificate, which will require you to open the API url (https://localhost:9926/api) directly in a browser and accept the certificate. 
- Update the `http` section's `CORS` attribute to `true`, and the `corsAccessList` attribute to have the nested value of `'*'`

```
http:
  compressionThreshold: 1200
  cors: true
  corsAccessList:
    - '*'
  keepAliveTimeout: 30000
  port: null
  securePort: 9926
  timeout: 120000
```

### Setup

- clone this repository into components directory (`~/hdb/components`)
- run `yarn` or `npm install`
- copy `dbs/credentials/credentials.example.js` to `dbs/credentials/credentials.js`
- add credentials for origin databases
  - DynamoDB: add your credentials file to the credentials folder and update line 10 with the filename.
  - Datastax: add your Secure Connect Bundle to the credentials folder and update line 26 with the filename.
- restart your application server

---

### UI

This project has a demonstration UI that lets you publish to origin DBs and see the data replicate to HarperDB. To run the UI in dev mode: 

- run `cd web` from the project's root directory
- run `yarn` or `npm install`
- run `yarn start` or `npm start`
- view the UI at `http://localhost:3000`

To deploy a compiled version of the UI:
- run `cd web` from the project's root directory
- run `yarn` or `npm install`
- run `yarn build` or `npm build`
- view the UI at `http://localhost:9926/ui/index.html`
