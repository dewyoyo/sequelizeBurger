// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
	// Add a new burger into database ============================================
	$(".create-form").on("submit", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		var newBurger = {
			burger_name: $("#burger_name").val().trim(),
			devoured: false,
			joinCustomerId: 1
		};

		// Send the POST request.
		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(
			function () {
				console.log("created new burger");
				// Reload the page to get the updated list
				location.reload();
			}
		);
	});


	// Make a burger devoured  and  Add a new customer into database ===============================
	$(".devour-button").on("click", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		var newCustomer = {
			customer_name: $("#customer_name").val().trim(),
		};

		if (newCustomer.customer_name == "" || newCustomer.customer_name == "1") {
			newCustomer.customer_name = "anonymous";
		}

		var id = $(this).data("id");
		console.log("devoured id: " + id);
		// var newDevour = $(this).data("newdevour");
		var newDevour = true;

		var newDevourState = {
			devoured: newDevour,
			customer_name: newCustomer.customer_name
		};


		// Send the PUT request.
		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: newDevourState
		}).then(
			function () {
				console.log("changed devour to", newDevour);
				// Reload the page to get the updated list
				location.reload();
			}
		);







	});


});
