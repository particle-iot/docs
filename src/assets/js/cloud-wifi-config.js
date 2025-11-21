$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.cloudWifiConfig').each(function() {
        const thisPartial = $(this);

        const updateButtons = function() {
            const s = $('.deviceSearchText').val().trim();

            $('.deviceSearchButton').prop('disabled', (s.length == 0));
        };

        $('.deviceSearchText').on('input blur', function() {
            updateButtons();
        });

        $('.deviceSearchButton').on('click', async function() {
            const org = parseInt($('.apiHelperSandboxOrgSelect').val());

            const params = {
                text: $('.deviceSearchText').val().trim(),
                type: 'device',
            };
            const queryParams = new URLSearchParams(params);

            let url = 'https://api.particle.io/v1/';

            if (org == 0) {
                url += 'user'
            }
            else {
                url += 'orgs/' + org;
            }
            url += '/search?' + queryParams.toString();
            
            const fetchRes = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                }
            });

            const jsonResult = await fetchRes.json();

            console.log('jsonResult', jsonResult);

        });



    })

});

