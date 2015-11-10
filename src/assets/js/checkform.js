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
		  				comments: datax.comments,
		  				urlFrom: window.location.pathname
						};//object



		//Post to Heroku App
		$.ajax({
		  method: "POST",
		  url: "http://localhost:5000",
		  dataType: 'json',
		  cache: false,
		  data: JSON.stringify(ddx),
	    success: function(data) {
	      if (data.ok == true) {
	          alert('success :  Messaged received');
						$("#name").val('');
						$("#email").val('');
						$("#email2").val('');
						$("#category option:selected").val();
						$("#comment").val('');
						$("#form-main").hide();
	      }
	    },
	    error: function(){
	      alert("failure: please email us");
	    }
		});//post function

	});//onSubmit Form end
	
});//end of document.ready Function



