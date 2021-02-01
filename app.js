const dialogs  = require('./dialog_vars');
const { Telegraf, session } = require('telegraf');
const stage = require('./scenes')

//Basic commands & bot initialization
const bot = new Telegraf(process.env["BOT_TOKEN"]);
bot.command('stop', ctx => bot.stop());
bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id,'Здравствуйте! Выберите диалоговую опцию для указания данных.', dialogs.main);
});
bot.use(session())
bot.use(stage.middleware())

// Main dialog actions
bot.action("menu", async ctx => {
    await ctx.editMessageText('Меню:');
    await ctx.editMessageReplyMarkup(dialogs.menu.reply_markup)
});
bot.action("delivery", async ctx => {
    await ctx.editMessageText('Выберите тип доставки:');
    await ctx.editMessageReplyMarkup(dialogs.delivery.reply_markup)
});
bot.action("payment", async ctx => {
    await ctx.editMessageText('Выберите тип оплаты:');
    await ctx.editMessageReplyMarkup(dialogs.payment.reply_markup)
});
bot.action("contacts", async ctx => {
    await ctx.editMessageText('Как с вами связаться?');
    await ctx.editMessageReplyMarkup(dialogs.contacts.reply_markup)
});
bot.action("backToMain", async ctx => {
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});
bot.action("send", async ctx => {
    if(ctx.session.Payment != undefined && ctx.session.Contacts != undefined)
    {
        if(ctx.session.Menu == undefined)
            ctx.session.Menu = {};
        await ctx.reply(`Итог: \n\tМеню: \n\t\t Пицца: ${ctx.session.Menu.Pizza || 'Не установлено'}, \n\t\t Япония: ${ctx.session.Menu.Japan || 'Не установлено'} , \n\t\t Бар: ${ctx.session.Menu.Bar || 'Не установлено'},\n\tТип доставки: ${ctx.session.Delivery || 'Не установлено'},\n\tТип оплаты: ${ctx.session.Payment || 'Не установлено'}\n\tКонтакт: ${ctx.session.Contacts || 'Не установлено'}`);
        ctx.session = {};
    }
    else
        await ctx.reply('Для отправки вы должны указать тип оплаты и контакты.');
});

// Payment dialog actions
bot.action("cash", async ctx => {
    ctx.session.Payment = "Нал";
    await ctx.reply('Установленый способ оплаты: нал')
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});
bot.action("cashless", async ctx => {
    ctx.session.Payment = "Безнал";
    await ctx.reply('Установленый способ оплаты: безнал')
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});

// Delivery dialog actions
bot.action("pickup", async ctx => {
    ctx.session.Delivery = "Самовывоз";
    await ctx.reply('Установленый способ доставки: ' + ctx.session.Delivery)
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});
bot.action("delivery_", async ctx => {
    ctx.session.Delivery = "Доставка";
    await ctx.reply('Установленый способ доставки: ' + ctx.session.Delivery)
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});

// Contacts dialog actions
bot.action("email", async ctx => {
    await ctx.scene.enter('emailScene');
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup);
});
bot.action("phone", async ctx => {
    await ctx.scene.enter('phoneScene');
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});

// Menu dialog actions
bot.action("pizza", async ctx => {
    await ctx.scene.enter('pizzaScene');
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});
bot.action("japan", async ctx => {
    await ctx.scene.enter('japanScene');
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});
bot.action("bar", async ctx => {
    await ctx.scene.enter('barScene');
    await ctx.editMessageText('Выберите диалоговую опцию для указания данных.');
    await ctx.editMessageReplyMarkup(dialogs.main.reply_markup)
});


bot.launch().catch(function (err){
    console.log(err);
});
console.log('bot server is up');
