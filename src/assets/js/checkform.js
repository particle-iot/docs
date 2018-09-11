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
		var detail = $("#detailmenu:visible option:selected").val();
		if(detail) {
		    datax.subj += " (" + detail + ")";
		}
		datax.topic = $("#questionmenu option:selected").val();
		datax.browserType = browserType;
		datax.ostype = ostype;
		datax.comments = $("#comment").val();

		//Validations
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//if( !regex.test(datax.email)) { alert('enter a valid email'); }

    //Object to send
    var ddx = { name: datax.name,
		  				email: datax.email ,
		  				subject: datax.subj,
						topic: datax.topic,
		  				comments: datax.comments,
		  				browserType: datax.browserType,
		  				osType: datax.ostype,
		  				urlFrom: window.location.pathname
						};//object


		var formUrl = (window.location.host === 'docs.staging.particle.io') ?
		    'https://staging-supportal.herokuapp.com/' :
		    'https://particle-support-portal.herokuapp.com';
		$.ajax({
		  method: "POST",
		  url: formUrl,
		  dataType: 'json',
		  cache: false,
		  data: JSON.stringify(ddx),
	      success: function(data) {
	      if (data.ok == true) {
					$("#name").val('');
					$("#email").val('');
					$("#email2").val('');
					$("#category option:selected").val();
					$("#detailmenu option:selected").val();
					$("#questionmenu option:selected").val();
					$("#comment").val('');
					$("#fileUp").val();
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
