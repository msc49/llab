
MONGO DB (Database)
1.	Download mongodb/brew:
brew tap mongodb/brew

2.	Install mongodb:
brew install mongodb-community@5.0

3.	Keep mongodb running in the background:
brew services start mongodb-community@5.0

Any issues? See documentation:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

4.	NPM Install (bundle in client)
cd client > npm install

5. NPM Install (bundle in server)
cd server > npm install

6. Install nodemon globally (type command from anywhere)
npm install --global nodemon

7. Run server (starts express)
cd server > nodemon index.js

8. Run client (starts react)
cd client > npm start 
