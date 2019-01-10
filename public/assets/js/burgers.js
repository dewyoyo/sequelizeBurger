// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
// Add a new burger into database ============================================
	$(".create-form").on("submit", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		var newBurger = {
			burger_name: $("#burger_name").val().trim(),
			devoured: false
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

	// Make a burger devoured ========================================================
	$(".devour-button").on("click", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		var id = $(this).data("id");
		console.log("devoured id: " + id);
		// var newDevour = $(this).data("newdevour");
		var newDevour = true;

		var newDevourState = {
			devoured: newDevour
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
