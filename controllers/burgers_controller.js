// routes
var express = require("express");

var router = express.Router();

// // Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
	db.SeqBurgers.findAll({})
		.then(function (result) {
			// res.json(result);
			var hbsObject = {
				burgers: result
			};
			console.log(hbsObject);
			res.render("index", hbsObject);
		});

});

router.post("/api/burgers", function (req, res) {
	console.log(req.body);
	db.SeqBurgers.create({
		burger_name: req.body.burger_name,
		devoured: req.body.devoured
	})
		.then(function (result) {
			res.json(result);
		});
});

router.put("/api/burgers/:id", function (req, res) {
	db.SeqBurgers.update(
		{devoured : req.body.devoured},
		{where: {id: req.params.id}
		})
		.then(function (result) {
			// res.json(result);
			var hbsObject = {
				burgers: result
			};
			console.log(hbsObject);
			res.render("index", hbsObject);
		});

});


// Export routes for server.js to use.
module.exports = router;
