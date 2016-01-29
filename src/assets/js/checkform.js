window.onload = function() {

	document.getElementById("category").addEventListener('change',function(e) {ha(e,'secondmenu');}, false);
	//document.getElementById("secondmenu").addEventListener('change',function(e) {ha(e,'category');}, false);
};

function ha (e,id){
	var indexValue = e.target.options[e.target.selectedIndex].value;
	//console.log(index);
	// if (e.target.selectedIndex == ""
	//document.getElementById(secondmenu).selectedIndex = index;

	switch(indexValue) {
		case "AA":
			break;
		case "BB":
			//indexValue = "BB";
			break;
		case "CC":
			//indexValue = "CC";
			break;
		case "DD":
			//indexValue = "DD";
			break;
	}//end of Switch case statement
}



$(document).ready(function() {
	$("#form1").on("submit", function(e) {
		e.preventDefault();

		console.log("Handling the submit");
		//gather the form data
		var datax = {};
		datax.name = $("#name").val();
		datax.email = $("#email").val();
		datax.email2 = $("#email2").val();
		datax.subj = $("#category option:selected").val();
		datax.comments = $("#comment").val();

		//Validations
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//if( !regex.test(datax.email)) { alert('enter a valid email'); }

    //Object to send
    var ddx = { name: datax.name,
		  				email: datax.email ,
		  				subject: datax.subj,
		  				comments: datax.comments,
		  				urlFrom: window.location.pathname
						};//object

///TEST VERSION IN LOCAL HOST
		//Post to Heroku App TEST VERSION IN LOCAL HOST
		$.ajax({
		  method: "POST",
		  url: "http://localhost:5000",
		  dataType: 'json',
		  cache: false,
		  data: JSON.stringify(ddx),
	      success: function(data) {
	      if (data.ok == true) {
					$("#name").val('');
					$("#email").val('');
					$("#email2").val('');
					$("#category option:selected").val();
					$("#comment").val('');
					$("#button-blue").css('background-color', 'green');
					$("#button-blue").attr('value', 'Message Received!');
			      }
	    	},
		    error: function(){
		      $("#button-blue").css('background-color', 'red');
			  $("#button-blue").attr('value', 'Please email hello@particle.io');
		    }
		});//post function

	});//onSubmit Form end

});//end of document.ready Function
