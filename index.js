const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const createGraphQLServer = require("./gql/server");
const session = require("express-session");

async function startServer() {
	const app = express();

	app.use(
		session({
			secret: "The most robust of secrets...",
			resave: false,
			saveUninitialized: false,
		})
	);

	app.use((req, res, next) => {
		console.log("Session:", req.session);
		next();
	});

	await createGraphQLServer(app);

	app.get("/", (req, res) => {
		res.send("Starts Api!");
	});

	app.listen(3000, () => {
		console.log("Server listen on http://localhost:3000");
	});
}

startServer();
