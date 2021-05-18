# Countries-Trivia

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

All you have left is to enjoy🎉🎊
