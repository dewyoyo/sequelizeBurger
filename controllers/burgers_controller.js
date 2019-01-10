// routes
var express = require("express");

var router = express.Router();

// // Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {

	db.JoinBurgers.findAll({
	
		include: [{
			model: db.joinCustomer,
			// where: {id: db.JoinBurgers.joinCustomerId }
		}]
	})
		.then(function (results) {
			// res.json(results);
			// console.log(results);
			var hbsObject = {
				burgers: results
			};
			// console.log(hbsObject);
			res.render("index", hbsObject);
		});

});

router.post("/api/burgers", function (req, res) {
	// console.log(req.body);
	db.JoinBurgers.create({
		burger_name: req.body.burger_name,
		devoured: req.body.devoured,
		joinCustomerId: req.body.joinCustomerId // set default value(anonymous) for joined table key
	})
		.then(function (result) {
			res.json(result);
		});
});

router.put("/api/burgers/:id", function (req, res) {
	var newCustomerID = 1;

	db.joinCustomer.findOrCreate({
		where: { customer_name: req.body.customer_name }
	}).then(function (findOrCreateCustomer) {
		// console.log("=================================");
		// console.log(findOrCreateCustomer[0].dataValues);
		// console.log(findOrCreateCustomer[0].dataValues.id);

		newCustomerID = findOrCreateCustomer[0].dataValues.id;

		db.JoinBurgers.update(
			{
				devoured: req.body.devoured,
				joinCustomerId: newCustomerID
			},
			{
				where: { id: req.params.id }
			})
			.then(function (result) {
				// res.json(result);
				var hbsObject = {
					burgers: result
				};
				console.log(hbsObject.dataValues);
				res.render("index", hbsObject);
			});

	});

});


// Export routes for server.js to use.
module.exports = router;
