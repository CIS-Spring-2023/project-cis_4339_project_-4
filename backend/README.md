# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install
    npm install bcrypt

### Before startup
You need a MongoDB database ready and have a connection URL to the MongoDB Atlas.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG
For example: 

    MONGO_URL= "mongodb+srv://group4:group4@cis4339.qbtjbyl.mongodb.net/CIS4339?retryWrites=true&w=majority"
    PORT= 3000
    ORG= "100"

### Compiles and hot-reloads for development

    npm start

## Postman Documentation

Can be found at <https://documenter.getpostman.com/view/23133138/2s83mdJiqh>

## Application Deployment to the cloud link:

    https://sweltering-purpose-production.up.railway.app/
