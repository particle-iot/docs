function checkForm() {
	// Fetching values from all input fields and storing them in variables.
	var name = document.getElementById("username").value;
	// var password = document.getElementById("password1").value;
	var email = document.getElementById("email1").value;
	var message = document.getElementById("text1").value;

	//Check input Fields Should not be blanks.
	if (name == '' || email == '' || message == '') {
		alert("Fill All Fields");
	} else { //bigElse

	// //Notifying error fields
	// var username1 = document.getElementById("username");
	// // var password1 = document.getElementById("password");
	// var email1 = document.getElementById("email1");
	// var message1 = document.getElementById("text1");

	// //Check All Values/Informations Filled by User are Valid Or Not.If All Fields Are invalid Then Generate alert.
	// if (username1.innerHTML == 'Must be 3+ letters' || email1.innerHTML == 'Invalid email' || message1.innerHTML == 'Invalid website') {
	// 	alert("Fill Valid Information");
	// } else {
	// 	//Submit Form When All values are valid.
	// 	document.getElementById("form1").submit();
	// 			 }
	// } //closing bigElse
}// function checkForm


// AJAX code to check input field values when onblur event triggerd.
function validate(field, query) {
	var xmlhttp;
	if (window.XMLHttpRequest) { // for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		     } //closing else

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState != 4 && xmlhttp.status == 200) {
			document.getElementById(field).innerHTML = "Validating..";
		} else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById(field).innerHTML = xmlhttp.responseText;
		} else {
			alert("Nah homie. you messed up.");
	}//closing if Status 200

	// xmlhttp.open("GET", "validation.php?field=" + field + "&query=" + query, false);
	xmlhttp.send("corey@particle.io");
}// function validate() 

//reference http://stackoverflow.com/questions/21884963/how-to-submit-this-form-using-ajax-without-jquery-but-pure-javascript
//reference http://www.formget.com/form-validation-using-ajax/