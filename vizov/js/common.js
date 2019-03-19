$(function() {

	$("input[type=\"phone\"]").inputmask("+7 (999) 999-99-99");

	//E-mail Ajax Send
	$("#main-form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php",
			//url: "https://cdn.jsdelivr.net/gh/agragregra/uniMail/script/mail.php",
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
