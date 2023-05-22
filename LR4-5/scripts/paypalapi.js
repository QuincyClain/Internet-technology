let _total = 14;
paypal.Button.render({
 //Configure environment
    env: 'sandbox',
    client: {
    sandbox: 'AYXu7cLaRxF9XQNRaKsefyeiw0vqDqr5OY63ElJKe6_BJ6Dzr7uoxio-mlixji1MO76g-PlrWbV6Cx2L'
    },
    //Customize button
    locale: 'en_US',
    style: {
    size: 'small',
    color: 'gold',
    shape: 'pill'
    },
    commit: true,
    //Set up a payment
    payment: function (data, actions) {
    return actions.payment.create({
    transactions: [{
                        amount: {
                            total: _total,
                            currency: 'USD'
                        }
                    }]
                });
            },
            //Execute the payment
            onAuthorize: function (data, actions) {
                return actions.payment.execute().then(function () {
                    var url = '../mainPage/mainTicketPage.html';
                    window.location.href = url;
                });
            }
        }, '#paypal-btn')