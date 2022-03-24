
(function(config) {

    // Setting an auth token here is optional. If you do not set the auth token
    // here, you'll be prompted for it interactively, which is more secure.
    // config.auth = 'xxxx';

    // If you leave this unset, the sandbox data report will be retrieved.
    // Otherwise, set the orgId here.
    // config.orgId = 'xxxx';

    // If you prompt for the authentication code, this is how long the token
    // should be valid in seconds. 3600 = 1 hour
    config.authTokenLifeSecs = 3600;

    // If you are using interactive login, you can temporarily save the token
    // in the settings.json file so you don't have to log in every time you
    // run the tool.
    config.saveInteractiveToken = false;

}(module.exports));


