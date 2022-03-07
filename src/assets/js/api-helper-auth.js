
$(document).ready(function() {
    const eventCategory = 'Docs SSO';

    let auth = null;
    let localAuth;

    const handleLogin = function() {
        ga('send', 'event', eventCategory, 'Login Started');

        const origUrl = window.location.href;
		window.location.href = 'https://login.particle.io/login?redirect=' + encodeURI(origUrl); 
    };

    const handleEditAccount = function() {
        ga('send', 'event', eventCategory, 'Edit Account');

        const origUrl = window.location.href;
		window.location.href = 'https://login.particle.io/account-info?redirect=' + encodeURI(origUrl); 
    };

    const handleLogout = function() {
        localStorage.removeItem('particleAuth'); // No longer used, but if present, remove

        if (typeof apiHelper != 'undefined' && apiHelper.localLogin ) {
            ga('send', 'event', eventCategory, 'Logged Out Local');
            localStorage.removeItem('apiHelperLocalLogin');

            if (!apiHelper.localLogin.tokenLogin) {
                // Invalidate the token on the cloud side
                $.ajax({
                    data: {
                        'access_token': apiHelper.localLogin.access_token
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
            }

            location.reload();   
        }
        else {
            ga('send', 'event', eventCategory, 'Logged Out SSO');
            const origUrl = window.location.href;
            window.location.href = 'https://login.particle.io/logout?redirect=' + encodeURI(origUrl);     
        }
    };

    if (typeof apiHelper != 'undefined') {
        apiHelper.loginAgain = function() {

            Cookies.remove('ember_simple_auth_session', { path: '/', domain: '.particle.io' });
            // $('.apiHelper').trigger('ssoLogout');
    
            handleLogin();
        }
    
    }

    const checkLogin = function() {
        const cookie = Cookies.get('ember_simple_auth_session');
        if (cookie) {
            try {
                const json = JSON.parse(cookie);
                if (json.authenticated && json.authenticated.username) {
                    auth = json.authenticated;
                }
            }
            catch(e) {
            }
        }
        if (!auth) {
            const testLoginString = localStorage.getItem('apiHelperTestLogin');
            if (testLoginString) {
                try {
                    const json = JSON.parse(testLoginString);
                    if (json.authenticated && json.authenticated.username) {
                        auth = json.authenticated;
                    }
                }
                catch(e) {
                }
            }    
        }

        const localLoginString = localStorage.getItem('apiHelperLocalLogin');
        if (localLoginString) {
            try {
                localAuth = JSON.parse(localLoginString);
            }
            catch(e) {
            }
        }
    
    
        if (auth || localAuth) {
            if (localAuth) {
                $('.apiHelperLocalLogIn').hide();
                $('.apiHelperLogoutButton').text('Log out of manual login');
                $('.apiHelperManualLoginDiv').hide();
                auth = localAuth;   
            }
            else
            if (auth) {
                $('.apiHelperLocalLogIn').hide();
            }

            if (typeof apiHelper != 'undefined') {
                apiHelper.isLocalAuth = !!localAuth;
            }

            $('.apiHelperLoggedIn').hide();
            $('.apiHelperCouldSSO').hide();    
            $('.apiHelperNotLoggedIn').hide();
            $('.apiHelperUser').text(auth.username);
    
            $('.apiHelperLoggedIn').each(function() {
                if ($(this).attr('data-hidden') != 'true') {
                    $(this).show();
                }
            });
            $('#userMenuLabel').text('Logged In');
    
            $('#userMenuLoggedInAs').text('Logged in as ' + auth.username)
    
            if (localAuth) {
                $('#userMenuConsole').hide();
                $('#userMenuEditAccount').hide();
            }
            else {
                $('#userMenuEditAccount > a').on('click', handleEditAccount);
            }
    
            $('#userMenuLogout > a').on('click', handleLogout);
        
        }
        else {
            $('.apiHelperNotLoggedIn').show();
            if (window.location.hostname.endsWith('particle.io')) {
                $('.apiHelperCouldSSO').show();
    
                const aElem = document.createElement('a');
                $(aElem).text('Log in...');
                $(aElem).on('click', handleLogin);
                $('#userMenuLoggedInAs').append(aElem);
                $('#userMenuLabel').text('Log In');
            }
            else {
                $('.apiHelperLocalLogIn').show();
                $('.apiHelperCouldSSO').hide();
            }
            $('#userMenuConsole').hide();
            $('#userMenuEditAccount').hide();
            $('#userMenuLogout').hide();
        }

        if (typeof apiHelper != 'undefined') {
            if (auth) {
                apiHelper.auth = auth;
            }
            else {
                delete apiHelper.auth;
            }
        }
    }
    
    $('.apiHelperLoginButton').on('click', handleLogin);

    $('.apiHelperLogoutButton').on('click', handleLogout);

    $('.apiHelperManualOption').hover(function(ev) {
        // handlerIn
        if (ev.originalEvent.altKey) {
            $('.apiHelperManualLoginDiv').show();
        }
    },
    function(ev) {
        // handlerOut
    });

    $('.apiHelperManualLoginButton').on('click', function() {
        $('.apiHelperManualLoginDiv').hide();
        $('.apiHelperLocalLogIn').show(); 
        $('.apiHelperLocalLoginLogInUsingRow').find('input[value="userPass"]').trigger('click');
    });

    checkLogin();

    if (typeof apiHelper == 'undefined') {
        // This page doesn't have API helper
        return;
    }


    $('.apiHelperLocalLogIn').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'localLogin';

        const pageLoginElem = $(thisPartial).find('.apiHelperLocalLoginPageLogin');
        const logInUsingRowElem = $(pageLoginElem).find('.apiHelperLocalLoginLogInUsingRow');
        const usernameRowElem = $(pageLoginElem).find('.apiHelperLocalLoginUsernameRow');
        const usernameInputElem = $(pageLoginElem).find('.apiHelperLocalLoginUsernameInput');
        const passwordRowElem = $(pageLoginElem).find('.apiHelperLocalLoginPasswordRow');
        const passwordInputElem = $(pageLoginElem).find('.apiHelperLocalLoginPasswordInput');
        const accessTokenRowElem = $(pageLoginElem).find('.apiHelperLocalLoginAccessTokenRow');
        const accessTokenInputElem = $(pageLoginElem).find('.apiHelperLocalLoginAccessTokenInput');
        const pageLoginButtonElem = $(pageLoginElem).find('.apiHelperLocalLoginLoginButton');

        const pageOTPElem = $(thisPartial).find('.apiHelperLocalLoginPageOTP');
        const otpInputElem = $(pageOTPElem).find('.apiHelperLocalLoginOtpInput');
        const pageOTPButtonElem = $(pageOTPElem).find('.apiHelperLocalLoginContinueLoginButton');

        const pageLoginFailedElem = $(thisPartial).find('.apiHelperLocalLoginPageLoginFailed');

        let mfaToken;

        try {
            const localLoginString = localStorage.getItem('apiHelperLocalLogin');
            if (localLoginString) {
                apiHelper.localLogin = JSON.parse(localLoginString);
            }
        }
        catch(e) {
        }
        if (!apiHelper.localLogin) {
            apiHelper.localLogin = {};
        }

        const loginSuccess = function(token) {
            apiHelper.localLogin.access_token = token;

            localStorage.setItem('apiHelperLocalLogin', JSON.stringify(apiHelper.localLogin));
            location.reload();
        }
        
        const logInRadioChange = function() {
            const radioVal = $(logInUsingRowElem).find("input:checked").val();
            
            switch(radioVal) {
                case 'userPass':
                    $(usernameRowElem).show();
                    $(passwordRowElem).show();
                    $(accessTokenRowElem).hide();
                    $(usernameInputElem).focus();   
                    break;
                case 'token':
                    $(usernameRowElem).hide();
                    $(passwordRowElem).hide();
                    $(accessTokenRowElem).show();
                    $(accessTokenInputElem).focus();   
                    break;
            }
        };
        $(logInUsingRowElem).find('input').on('click', logInRadioChange);
        logInRadioChange();

        $(pageLoginButtonElem).on('click', function() {
            $(pageLoginElem).hide();
            $(pageLoginFailedElem).hide();

            $('.apiHelperRequiresLocalLogin').each(function() {
                $(this).hide();
            });
    
            const radioVal = $(logInUsingRowElem).find("input:checked").val();
            switch(radioVal) {
                case 'userPass':
                    // Attempt to log into the Particle cloud
                    apiHelper.localLogin.username = $(usernameInputElem).val();
                    apiHelper.localLogin.tokenLogin = false;
                    $.ajax({
                        data: {
                            'client_id': 'particle',
                            'client_secret': 'particle',
                            'expires_in': 3600,
                            'grant_type': 'password',
                            'password': $(passwordInputElem).val(),
                            'username': $(usernameInputElem).val()
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status === 403) {
                                // Got a 403 error, MFA required. Show the MFA/OTP page.
                                mfaToken = jqXHR.responseJSON.mfa_token;
                                $(pageOTPElem).show();
                                $(otpInputElem).val('');
                                $(otpInputElem).focus();
                                return;
                            }
                            $(pageLoginElem).show();
                            $(pageLoginFailedElem).show();
                        },
                        method: 'POST',
                        success: function (data) {
                            loginSuccess(data.access_token);
                        },
                        url: 'https://api.particle.io/oauth/token',
                    });
                    break;

                case 'token':
                    // Verify the token
                    $.ajax({
                        error: function (jqXHR, textStatus, errorThrown) {
                            $(pageLoginElem).show();
                            $(pageLoginFailedElem).show();
                        },
                        method: 'GET',
                        success: function (data) {
                            apiHelper.localLogin.username = data.username;
                            apiHelper.localLogin.tokenLogin = true;
                            loginSuccess($(accessTokenInputElem).val());
                        },
                        url: 'https://api.particle.io/v1/user?access_token=' + $(accessTokenInputElem).val(),
                    });
                    break;
            }
            
        });

        $(usernameInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(passwordInputElem).focus();   
        });  

        $(passwordInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(pageLoginButtonElem).trigger('click');    
        });  

        $(accessTokenInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(pageLoginButtonElem).trigger('click');    
        });  
        
        $(otpInputElem).on('keydown', function(ev) {
            if (ev.key != 'Enter') {
                return;
            }

            ev.preventDefault();
            $(pageOTPButtonElem).trigger('click');    
        });  

        $(pageOTPButtonElem).on('click', function() {
            const otpValue = $(otpInputElem).val();

            $(pageOTPElem).hide();

            $.ajax({
                data: {
                    'client_id': 'particle',
                    'client_secret': 'particle',
                    'grant_type': 'urn:custom:mfa-otp',
                    'mfa_token': mfaToken,
                    'otp': otpValue
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Invalid MFA token
                    $(pageLoginElem).show();
                    $(pageLoginFailedElem).show();
                },
                method: 'POST',
                success: function (data) {
                    loginSuccess(data.access_token);
                },
                url: 'https://api.particle.io/oauth/token',
            });
        })


    });
});

