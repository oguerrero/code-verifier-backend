## CODE VERIFIER MERN BACKEND APP
***
### Dependencies: 
* cors: Basic Security
* dotenv: Enviroment variables
* express: Server
* helmet: Basic Security
* mongoose: MongoDB Conection
### Dev Dependencies
* Concurrently: Multiple scripts on command line
* Coverage: Documentation in HTML
* Eslint: Linter for TS
* Jest: Unit Testing
* Nodemon: Hot reload on server
* Serve: Localhost server for coverage
* TypeScript: Types
* Webpack: Optimized builds
### Scripts
* build: npx tsc (Create Dist fonder)
* start: node dist/index.js (Start server)
* dev: concurrently \npx tsc --watch\ \nodemon -q dist/index.js\ (transpile TS and hot reload server)
* test: jest (Unit testing)
* serve:coverage: npm run test && cd coverage/lcov-report && npx serve (Create HTML of jsdocs)