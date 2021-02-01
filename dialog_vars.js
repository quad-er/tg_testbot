const main = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Меню',
                    callback_data: 'menu'
                }
            ],
            [
                {
                    text: 'Доставка',
                    callback_data: 'delivery'
                }
            ],
            [
                {
                    text: 'Оплата',
                    callback_data: 'payment'
                }
            ],
            [
                {
                    text: 'Контакты',
                    callback_data: 'contacts'
                }
            ],
            [
                {
                    text: 'Отправить',
                    callback_data: 'send'
                }
            ]
        ]
    }
}
const menu = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Пицца',
                    callback_data: 'pizza'
                }
            ],
            [
                {
                    text: 'Япония',
                    callback_data: 'japan'
                }
            ],
            [
                {
                    text: 'Бар',
                    callback_data: 'bar'
                }
            ],
            [
                {
                    text: 'Вернуться',
                    callback_data: 'backToMain'
                }
            ]
        ]
    }
}
const payment = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Нал',
                    callback_data: 'cash'
                }
            ],
            [
                {
                    text: 'Безнал',
                    callback_data: 'cashless'
                }
            ],
            [
                {
                    text: 'Вернуться',
                    callback_data: 'backToMain'
                }
            ]
        ]
    }
}
const contacts = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Телефон',
                    callback_data: 'phone'
                }
            ],
            [
                {
                    text: 'Email',
                    callback_data: 'email'
                }
            ],
            [
                {
                    text: 'Вернуться',
                    callback_data: 'backToMain'
                }
            ]
        ]
    }
}
const delivery = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Самовывоз',
                    callback_data: 'pickup'
                }
            ],
            [
                {
                    text: 'Доставка',
                    callback_data: 'delivery_'
                }
            ],
            [
                {
                    text: 'Вернуться',
                    callback_data: 'backToMain'
                }
            ]
        ]
    }
}



module.exports.menu = menu;
module.exports.main = main;
module.exports.payment = payment;
module.exports.contacts = contacts;
module.exports.delivery = delivery;
