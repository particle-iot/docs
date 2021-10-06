
$(document).ready(function() {
    const eventCategory = 'Docs SSO';

    let auth = null;

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
        ga('send', 'event', eventCategory, 'Logged Out');
        localStorage.removeItem('particleAuth');

        const origUrl = window.location.href;
		window.location.href = 'https://login.particle.io/logout?redirect=' + encodeURI(origUrl); 

        /*
        Cookies.remove('ember_simple_auth_session', { path: '/', domain: '.particle.io' });
        $('.apiHelper').trigger('ssoLogout');
        location.reload();
        */
    };

    $('.apiHelperFakeAuthButton').on('click', function() {
        const authData = prompt('JSON authentication data:');
        if (authData) {
            localStorage.setItem('particleAuth', authData);
            location.reload();
        }
    });
    
    $('.apiHelperLoginButton').on('click', handleLogin);

    $('.apiHelperLogoutButton').on('click', handleLogout);

    const cookie = Cookies.get('ember_simple_auth_session');
    if (cookie) {
        try {
            const json = JSON.parse(cookie);
            if (json.authenticated) {
                auth = json.authenticated;
            }
        }
        catch(e) {
        }
    }
    const fakeAuth = localStorage.getItem('particleAuth');
    if (fakeAuth) {
        try {
            auth = JSON.parse(fakeAuth);
        }
        catch(e) {
        }
    }

    $('.apiHelperLoggedIn').hide();
    $('.apiHelperCouldSSO').hide();
    $('.apiHelperFakeAuth').hide();

    if (auth) {
        $('.apiHelperUser').text(auth.username);

        $('.apiHelperLoggedIn').each(function() {
            if ($(this).attr('data-hidden') != 'true') {
                $(this).show();
            }
        });

        $('#userMenuLoggedInAs').text('Logged in as ' + auth.username)

        $('#userMenuEditAccount > a').on('click', handleEditAccount);

        $('#userMenuLogout > a').on('click', handleLogout);
    }
    else {
        if (window.location.hostname.endsWith('particle.io')) {
            $('.apiHelperCouldSSO').show();

            const aElem = document.createElement('a');
            $(aElem).text('Log in...');
            $(aElem).on('click', handleLogin);
            $('#userMenuLoggedInAs').append(aElem);
        }
        else {
            $('.apiHelperFakeAuth').show();
            $('#userMenuLoggedInAs').text('Not logged in');
        }
        $('#userMenuEditAccount').hide();
        $('#userMenuLogout').hide();
    }
    if (typeof apiHelper != 'undefined') {
        apiHelper.auth = auth;
    }
});

