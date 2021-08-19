# EddieCon-01-workshop

Workshop for EddieCon 0.1 - building an API in TDD style using ExpressJS with DataStax and PactumJS for testing.

YouTube link https://www.youtube.com/watch?v=0lOAOQaTNdw

## Tools

- ExpressJS http://expressjs.com
- PactumJS https://pactumjs.github.io/#/
- DataStax http://links.eddiejaoude.io/t/BQe90ur6AYCp

## Tutorial

To re-create this project from scratch.

### 1. create a repo

Create repo on GitHub with a name like `api-datastax` (or name of your project)

### 2. clone the repo

Clone repo locally `git clone git://github.com/<username>/api-datastax`

### 3. initialise npm

3a. Navigate into the directory `cd api-datastax`

3b. Initialise npm with `npm init -y`

### 4. testing

4a. Install PactumJS dependency `npm install pactum-js`

4b. Install CucumberJS dependency `npm install @cucumber/cucumber`

4c. Create directory `features` and `features/support`

4d. Create `features/support/steps.js` file with the following content:



4e. Create `features/test.feature` file with the following content:


4f. Add test command to package.json file `"test": "cucumber-js"`

4g. Run tests with `npm test`

You will have an error like this because there is no API to test.

```
Failures:

1) Scenario: Check root path # features/test.feature:3
   ✔ Before # features/support/steps.js:6
   ✔ Given I make a GET request to "http://localhost:3000" # features/support/steps.js:10
   ✖ When I receive a response # features/support/steps.js:14
       Error: connect ECONNREFUSED 127.0.0.1:3000
           at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1133:16)
   - Then response should have a status 200 # features/support/steps.js:18
   - And response should have a body "{\"name\":\"hello world!\"}" # features/support/steps.js:22

```

### 5. api

5a. Create `src` directory and `src/server.js` file with the following content:


5b. Install nodemon dependency `npm install nodemon`

5c. Add nodemon command to package.json file `"start": "nodemon src/server.js"`

5d. Run API with `npm start`

5e. Run tests in a new terminal with `npm test` and now they should pass

```
> eddiecon-01-workshop@1.0.0 test
> cucumber-js

...........

2 scenarios (2 passed)
9 steps (9 passed)
0m00.023s (executing steps: 0m00.020s)
```

### 6. DataStax

6a. sign up http://links.eddiejaoude.io/t/BQe90ur6AYCp
6b. create database `api`
6c. create keyspace `apidemo`
6d. create token

6e. set environment variables (treat these as passwords)

6f. insert data using curl

```
curl --request POST \
--url https://$ASTRA_DB_ID-$ASTRA_DB_REGION.apps.astra.datastax.com/api/rest/v2/namespaces/$ASTRA_DB_KEYSPACE/collections/apidemo \
-H "X-Cassandra-Token: $ASTRA_DB_APPLICATION_TOKEN" \
-H 'Content-Type: application/json' \
-d '{
"social": "GitHub",
"link": "http://github.com/eddiejaoude"
}'
```

6g. Install AstraJS Collections dependency `npm install @astrajs/collections`

Documentation of AstraJS Collections for Javascript https://docs.datastax.com/en/astra/docs/astra-collection-client.html

6g. Import `@astrajs/collections` with `const { createClient } = require("@astrajs/collections");` in `src/server.js`
6h. Create the AstraJS client with

```js
const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
});
```

Note: do not forget to add `async` to the function.

6i. Access the collection for easier use

```js
const socialsCollection = astraClient.namespace("apidemo").collection("socials");
```

6j. Find all the data

```js
const socials = await socialsCollection.find({ });
```

7. Run tests in a new terminal with `npm test` and now they should pass

## Stretch goals

These are features you can add to the project.

- POST data to the API to save data in the DB
- PATCH data to the API to update data in the DB
- DELETE data to the API to delete data in the DB
