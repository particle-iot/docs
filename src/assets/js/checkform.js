$(document).ready(function() {
	
	$("#form1").on("submit", function(e) {
		e.preventDefault();

		console.log("Handling the submit");
		//add error handling here
		//gather the form data
		var datax = {};
		datax.name = $("#name").val();
		//data.cat = $("#category").val();
		datax.email = $("#email").val();
		datax.email2 = $("#email2").val();
		datax.subj = $("#category option:selected").val();
		datax.comments = $("#comment").val();

		//Validations
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
		if( !regex.test(datax.email)) { alert('enter a valid email'); }

    if (datax.email != datax.email2)
    {
      alert('Those emails don\'t match!');
      return false;
    } 

    if (datax.name == '') {
    	swal("Here's a message!")
    	return false;
    }

    if (datax.comments == ''){
    	alert('Please leave a comment');
    	return false;
    }

    //Object to send
    var ddx = { name: datax.name, 
		  				email: datax.email ,
		  				subject: datax.subj,
		  				comments: datax.comments
						};//object

	// 	serialize = function(obj) {
	//   var str = [];
	//   for(var p in obj)
	//     if (obj.hasOwnProperty(p)) {
	//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	//     }
	//   return str.join("&");
	// }

		//Post to Heroku App
		$.ajax({
		  method: "POST",
		  url: "http://localhost:8081",
		  dataType: 'json',
		  data: JSON.stringify(ddx)
		})//post function

	});//onSubmit Form end
	
});//end of ready Function



