# HarperDB EdgeTL

A demonstration of HarperDB's ability to subscribe to changes in external databases and deliver REST and Real-Time interfaces across the edge.

---

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
