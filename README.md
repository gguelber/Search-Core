### Search Core

Application to search for scientific articles using the Core API.

### Instructions to install dependencies

Download or clone this repository, go to the terminal inside the main folder where you saved and type: 
        
        npm install

Go to /core-api and also type: 

        npm install

### Instructions to test (only few functions are available, need to start the server to test the API)

        npm test

### Instructions to run the SERVER (Run the server before the front-end to ensure it uses port 3000 and the front-end uses 3001!):

Create an account on MongoAtlas, start a new cluster (free) and create a database (any name). 

Ask for an API Key to use the [Core API](https://core.ac.uk/api-keys/register/)

Create a .env file inside and add 3 variables:
        
        DB_CONNECT = Your_MongoAtlas_Connection_String
        SECRET_TOKEN = Any_Random_String
        CORE_API_KEY = Your_API_Key
        
Open the terminal on the ./core-api folder and start the server using

        npm start

If everything is ok, you should see in the console:

        Server up and running on port 3000
        Connected to MongoDB
       

### Instructions to run the FRONT-END

Open another terminal on the search-core folder and type:

        npm start

When the console asks for another port, type y to confirm

### Create Account

Names needs to have at least 2 chars

Passwords needs to have at least 6 chars

All fields are required 














This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

