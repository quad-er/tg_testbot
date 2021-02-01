const dialogs  = require('./dialog_vars');
const { Telegraf, session } = require('telegraf');
const stage = require('./scenes')
const mainText = 'Выберите диалоговую опцию для указания данных.';

//Basic commands & bot initialization
const bot = new Telegraf(process.env["BOT_TOKEN"]);
bot.command('stop', ctx => bot.stop());
bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id,'Здравствуйте! Выберите диалоговую опцию для указания данных.', dialogs.main);
});
bot.use(session())
bot.use(stage.middleware())

async function updateMessage(ctx, text, markup){
    await ctx.editMessageText(text);
    await ctx.editMessageReplyMarkup(markup)
}
// Main dialog actions
bot.action("menu", async ctx => {
    await updateMessage(ctx, "Меню:", dialogs.menu.reply_markup);
});
bot.action("delivery", async ctx => {
    await updateMessage(ctx, 'Выберите тип доставки:', dialogs.delivery.reply_markup);
});
bot.action("payment", async ctx => {
    await updateMessage(ctx, 'Выберите тип оплаты:', dialogs.payment.reply_markup);
});
bot.action("contacts", async ctx => {
    await updateMessage(ctx, 'Как с Вами связаться?', dialogs.contacts.reply_markup);
});
bot.action("backToMain", async ctx => {
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});
bot.action("send", async ctx => {
    if(ctx.session.Payment !== undefined && ctx.session.Contacts !== undefined)
    {
        if(ctx.session.Menu === undefined)
            ctx.session.Menu = {};
        await ctx.reply(`Итог: 
        Меню: 
        \t\t Пицца: ${ctx.session.Menu.Pizza || 'Не установлено'}, 
        \t\t Япония: ${ctx.session.Menu.Japan || 'Не установлено'}, 
        \t\t Бар: ${ctx.session.Menu.Bar || 'Не установлено'},
        Тип доставки: ${ctx.session.Delivery || 'Не установлено'},
        Тип оплаты: ${ctx.session.Payment || 'Не установлено'}
        Контакт: ${ctx.session.Contacts || 'Не установлено'}`);
        ctx.session = {};
    }
    else
        await ctx.reply('Для отправки вы должны указать тип оплаты и контакты.');
});

// Payment dialog actions
bot.action("cash", async ctx => {
    ctx.session.Payment = "Нал";
    await ctx.reply('Установленый способ оплаты: Нал')
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});
bot.action("cashless", async ctx => {
    ctx.session.Payment = "Безнал";
    await ctx.reply('Установленый способ оплаты: Безнал')
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});

// Delivery dialog actions
bot.action("pickup", async ctx => {
    ctx.session.Delivery = "Самовывоз";
    await ctx.reply('Установленый способ доставки: ' + ctx.session.Delivery);
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});
bot.action("delivery_", async ctx => {
    ctx.session.Delivery = "Доставка";
    await ctx.reply('Установленый способ доставки: ' + ctx.session.Delivery);
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});

// Contacts dialog actions
bot.action("email", async ctx => {
    await ctx.scene.enter('emailScene');
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});
bot.action("phone", async ctx => {
    await ctx.scene.enter('phoneScene');
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});

// Menu dialog actions
bot.action("pizza", async ctx => {
    await ctx.scene.enter('pizzaScene');
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});
bot.action("japan", async ctx => {
    await ctx.scene.enter('japanScene');
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});
bot.action("bar", async ctx => {
    await ctx.scene.enter('barScene');
    await updateMessage(ctx, mainText, dialogs.main.reply_markup);
});


bot.launch().catch(function (err){
    console.log(err);
});
console.log('bot server is up');
