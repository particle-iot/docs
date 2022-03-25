var particle = new Particle();
let mfa_token;

$(document).ready(function () {
  // This function is called when the page loads

  $('#loginForm').submit(function (e) {
    // The Login button on the login page was clicked (or Return pressed)
    e.preventDefault();

    // Hide the login page so the button goes away
    $('#loginDiv').css('display', 'none');
    $('#loginFailedDiv').css('display', 'none');
    sessionStorage.particleUser = $('#userInput').val();

    // Attempt to log into the Particle cloud
    $.ajax({
      data: {
        client_id: 'particle',
        client_secret: 'particle',
        expires_in: 3600,
        grant_type: 'password',
        password: $('#passwordInput').val(),
        username: $('#userInput').val(),
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 403) {
          // Got a 403 error, MFA required. Show the MFA/OTP page.
          mfa_token = jqXHR.responseJSON.mfa_token;
          $('#otpDiv').css('display', 'inline');
          return;
        }
        console.log('error ' + textStatus, errorThrown);
        $('#loginDiv').css('display', 'inline');
        $('#loginFailedDiv').css('display', 'inline');
      },
      method: 'POST',
      success: function (data) {
        loginSuccess(data.access_token);
      },
      url: 'https://api.particle.io/oauth/token',
    });
  });

  $('#otpForm').submit(function (e) {
    // Login on the OTP/MFA form
    e.preventDefault();

    $('#otpDiv').css('display', 'none');

    $.ajax({
      data: {
        client_id: 'particle',
        client_secret: 'particle',
        grant_type: 'urn:custom:mfa-otp',
        mfa_token: mfa_token,
        otp: $('#otpInput').val(),
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // Invalid MFA token
        $('#loginDiv').css('display', 'inline');
        $('#loginFailedDiv').css('display', 'inline');
      },
      method: 'POST',
      success: function (data) {
        loginSuccess(data.access_token);
      },
      url: 'https://api.particle.io/oauth/token',
    });
  });

  $('#logoutButton').on('click', function (e) {
    // Logout button clicked
    e.preventDefault();

    // Delete the access token from local session storage
    const accessToken = sessionStorage.particleToken;
    delete sessionStorage.particleToken;
    delete sessionStorage.particleUser;

    // Invalidate the token on the cloud side
    $.ajax({
      data: {
        access_token: accessToken,
      },
      method: 'DELETE',
      complete: function () {
        // Show the login page
        $('#mainDiv').css('display', 'none');
        $('#loginDiv').css('display', 'inline');
        $('#loginFailedDiv').css('display', 'none');
      },
      url: 'https://api.particle.io/v1/access_tokens/current',
    });
  });

  if (sessionStorage.particleToken) {
    // We have a Particle access token in the session storage. Probably
    // refreshed the page, so try to use it. You don't need to log in
    // every time, you can reuse the access token if it has not expired.
    $('#loginDiv').css('display', 'none');
    getDevices();
  }
});

function loginSuccess(token) {
  sessionStorage.particleToken = token;
  getDevices();
}

function getDevices() {
  // Request the device list from the cloud
  particle.listDevices({ auth: sessionStorage.particleToken }).then(
    function (data) {
      // Success! Show the main page
      $('#mainDiv').css('display', 'inline');

      // Load the device selector popup
      loadDeviceList(data.body);
    },
    function (err) {
      // Failed to retrieve the device list. The token may have expired
      // so prompt for login again.
      $('#mainDiv').css('display', 'none');
      $('#loginDiv').css('display', 'inline');
      $('#loginFailedDiv').css('display', 'inline');
    }
  );
}

function loadDeviceList(deviceList) {
  let html = '';

  $('#userSpan').text(sessionStorage.particleUser);

  deviceList.forEach(function (dev) {
    // Add devices to the popup menu
    const optionElem = document.createElement('option');
    $(optionElem).prop('value', dev.id);
    $(optionElem).text(dev.name + (dev.online ? '' : ' (offline)'));

    $('#deviceSelect').append(optionElem);
  });
}
