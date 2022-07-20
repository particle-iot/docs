$(document).ready(function () {

    if ($('.apiHelperTroubleshooting').each(function() {
        const thisPartial = $(this);

        const gaCategory = 'troubleshootingTool';

        // Decision tree definition
        const decisionTree = [
            {
                page: 100,
                description: 'You must log into your Particle account to use the troubleshooting tool.',
                buttons: [
                    {
                       title: 'I forgot my password and need to reset it',
                       loginService: 'change-password',
                    },
                    {
                        title: 'I don\'t have an account yet and need to create one',
                        loginService: 'signup',
                    },
                    {
                        title: 'I am blocked from logging in due to multi-factor authentication (2FA/MFA)',
                        page: 102,
                    },
                    {
                        title: 'I cannot login because I don\'t know my username or password',
                        ticketForm: 360006636853,
                    },
                    {
                        title: 'I cannot login due to an error in the login page',
                        ticketForm: 360006636853,
                    },
                 ],
            },
            {
                page: 101,
                description: 'What kind of issue are you experiencing?',
                buttons: [
                    {
                    },
                ],
            },
            {
                page: 102,
                description: 'I am blocked from logging in due to multi-factor authentication (2FA/MFA)',
                ticketForm: 360006636853,
                
            },
        ];

        let pageStack = [];

        const updateUrl = function() {
            // TODO: Match the query parameters to the pageStack here
        }

        const clearPagesBelow = function(page) {
            for(let ii = 0; ii < pageStack.length; ii++) {
                if (pageStack[ii].page == page) {
                    $(pageStack[ii].pageDivElem).find('.apiHelperGiantButtonSelected').removeClass('apiHelperGiantButtonSelected');

                    for(let jj = ii + 1; jj < pageStack.length; jj++) {
                        $(pageStack[jj].pageDivElem).remove();
                    }
                    pageStack.splice(ii);
                    break;
                }
            }
            updateUrl();
        };

        const showPage = function(page) {
            const pageObj = decisionTree.find(e => e.page == page);

            ga('send', 'event', gaCategory, 'showPage', page);

            const pageDivElem = document.createElement('div');
            $(pageDivElem).data('page', page);

            const descriptionElem = document.createElement('div');
            $(descriptionElem).text(pageObj.description);
            $(pageDivElem).append(descriptionElem);

            if (pageObj.buttons) {
                for(const buttonObj of pageObj.buttons) {
                    const buttonElem = document.createElement('div');
                    $(buttonElem).addClass('apiHelperGiantButton');
                    $(buttonElem).text(buttonObj.title);

                    $(buttonElem).on('click', function() {
                        clearPagesBelow(page);
                        $(buttonElem).addClass('apiHelperGiantButtonSelected');

                        if (buttonObj.loginService) {
                            const curPage = window.location.href;
                            ga('send', 'event', gaCategory, 'loginService', buttonObj.loginService);
                            window.location.href = 'https://login.particle.io/' + buttonObj.loginService + '?redirect=' + curPage;                        
                        }
                        else
                        if (buttonObj.page) {
                            showPage(buttonObj.page);
                        }
                    });

                    $(pageDivElem).append(buttonElem);
                }    
            }

            const separatorElem = document.createElement('div');
            $(separatorElem).addClass('apiHelperTroubleshootingSeparator');
            $(separatorElem).html('&nbsp;');
            $(pageDivElem).append(separatorElem);

            $(thisPartial).append(pageDivElem);

            pageStack.push({
                page,
                pageObj,
                pageDivElem,
            });

            updateUrl();
        };


        if (apiHelper.auth) {
            // Have a token, verify it
            showPage(101);
        }
        else {
            // No token
            showPage(100);
        }

    }));
});
