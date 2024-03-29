var express = require("express");

// set port
var PORT = process.env.PORT || 8080;

// set express app
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const Handlebars = require('handlebars');
var exphndle = require("express-handlebars");

// Import function exported by newly installed node modules. 03/02/2023
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

app.engine("handlebars", exphndle.engine({
	defaultLayout: "main",
	// ...implement newly added insecure prototype access 03/02/2023
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set("view engine", "handlebars");



// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");
app.use(routes);



// Requiring our models for syncing
var db = require("./models");

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
	
	//set anonymous customer
	db.joinCustomer.create({
		customer_name: "anonymous"
	}).then(function (insertJoinCustomer) {
		console.log(insertJoinCustomer.dataValues);
	});

	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT);
	});
});
