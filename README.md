# <img src="./client/src/images/globe2.gif" alt="globe image" width="50"/> Countries-Trivia <img src="./client/src/images/globe2.gif" alt="globe image" width="50"/>

## Technologies used

- MySQL
- Sequelize
- Express
- Node.js
- Authentication using JWT
- React
- Redux-Toolkit
- Styled Components
- CSS
- AWS RDS

## How to run on your local machine:

Install server dependencies

```
npm i
```

And install the client dependencies

```
cd client
npm i
```

Go back to the main folder

```
cd ..
```

To create the DB locally run

```
npm run create:db
```

The command above does the migrating and seeding for you 😉, it will do the same as running the commands:

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Create a .env file with the required variables using the example.env file

To start the server

```
npm run dev
```

To start the client go to the client folder and run

```
cd client
npm start
```

All you have left to do is to enjoy🎉🎊

## Deployed version on Google Cloud

[App Engine page](https://direct-obelisk-314012.ey.r.appspot.com/)
