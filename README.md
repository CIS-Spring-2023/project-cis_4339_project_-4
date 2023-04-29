# Data Platform Project Setup

This project has been developed over time by students in the CIS 4339 course.

The current iteration is based on development done by Elliot Farmer Garcia, Agatha	Molski and Chris	Blanco in Fall of 2022, and has been developed and updated by Donna Huynh, Phat Vo and Mawdo Diallo in Spring of 2023

Requirements:

This project uses NodeJS and MongoDB.

This project will require 2 terminal instances: 1 for the front end, and 1 for the backend


# Data Platform Frontend
## Frontend Vue 3 Application
```
cd frontend
```
This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.

## Project setup

    npm install
    npm install pinia-plugin-persistedstate
    npm install pinia
    npm install axios

### Before startup
You need to either have a local backend running and or use a cloud deployed backend.

Setup a .env file with following variables, e.g.:

    VITE_ROOT_API=http://localhost:3000

VITE_ROOT_API is the URL for the backend API, either on localhost or in the cloud.

### Compiles and hot-reloads for development

    npm run dev

# In the web browser, enter http://localhost:5173/ to access the page

## Login
In the Login page, there are two users currently created in the system
1. Editor user: 
- Username: admin
- Password: admin
- Restriction: Can see and access all the views

2. Viewer user:
- Username: viewer
- Password: viewer
- Restriction: Can only see and access to the Dashboard, Find Client, Find Event and Find Service views.
3. Guest user without logging in can only access Dashboard and Login page
* User after logging in will see the 'Welcome, user' and Logout option in the Navigation Panel

## Functions:
1. In the Dashboard, all users can see the bar chart of 'Number of attendees in Events', and a pie chart of 'Number of attendees by Zipcode'

2. Users can create new services in the 'Add Service' view by entering Service Name, Description, and choose Status (Active by default) in a form. 
Then users will be directed to the Find Service page to look for specific services.

3. Users can edit certain service by clicking the service in Find Service page and will be directed to the Edit Service view.
After editting, users will be directed to the 'Service Detail' view to edit, update or delete service.

4. Users can deactivate certain service by clicking the 'Deactivate' button next to the service, and that service status will be changed to 'Inactive'

5. All the services with Active status will be listed in the 'Create Event' and 'Edit Event' view.

# Data Platform Backend
## Backend Node Application
```
cd backend
```
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
