
const{ Scenes: {BaseScene, Stage}, Markup } = require('telegraf')
//set up keyboard for exit the scene on exit action
//should be called when enter middleware
const keyboard = Markup.keyboard(['back']).oneTime();
//initializing remove keyboard method
//should be called before leave middleware
const removeKeyboard = Markup.removeKeyboard();

// scene for phone input
const phoneScene = new BaseScene('phoneScene')
phoneScene.enter((ctx)=>{
    ctx.reply('Введите номер телефона', keyboard.resize());
})
phoneScene.on('text', (ctx) =>{
    const phone = ctx.message.text;
    ctx.session.Contacts = phone;
    return ctx.scene.leave();
})
phoneScene.leave((ctx) => {
    ctx.reply('Мы свяжемся с вами по номеру телефона: ' + (ctx.session.Contacts || 'Не установлено'), removeKeyboard);
})


// scene for email input
const emailScene = new BaseScene('emailScene')
emailScene.enter(async (ctx)=>{
    await ctx.reply('Введите email', keyboard.resize());
})
emailScene.on('text', async (ctx) =>{
    const email = ctx.message.text;
    ctx.session.Contacts = email;
    return ctx.scene.leave();
})
emailScene.leave(async (ctx) => {
    await ctx.reply('Мы свяжемся с вами по email: ' + (ctx.session.Contacts || 'Не установлено'), removeKeyboard);
})


// scene for menu items input
const pizzaScene = new BaseScene('pizzaScene')
pizzaScene.enter(async (ctx)=>{
    if(ctx.session.Menu == undefined)
        ctx.session.Menu = {};
    await ctx.reply('Введите количество пиццы', keyboard.resize());
})
pizzaScene.on('text', async (ctx) =>{
    const pizzaAmount = ctx.message.text;
    ctx.session.Menu.Pizza = pizzaAmount;
    return ctx.scene.leave();
})
pizzaScene.leave(async (ctx) => {
    await ctx.reply('Пиццы в заказе: ' + (ctx.session.Menu.Pizza || 'Не установлено'), removeKeyboard);
})

const japanScene = new BaseScene('japanScene')
japanScene.enter(async (ctx)=>{
    if(ctx.session.Menu == undefined)
        ctx.session.Menu = {};
    await ctx.reply('Введите количество Японии', keyboard.resize());
})
japanScene.on('text', async (ctx) =>{
    const japanAmount = ctx.message.text;
    ctx.session.Menu.Japan = japanAmount;
    return ctx.scene.leave();
})
japanScene.leave(async (ctx) => {
    await ctx.reply('Японии в заказе: ' + (ctx.session.Menu.Japan || 'Не установлено'), removeKeyboard);
})

const barScene = new BaseScene('barScene')
barScene.enter(async (ctx)=>{
    if(ctx.session.Menu == undefined)
        ctx.session.Menu = {};
    await ctx.reply('Введите количество бара', keyboard.resize());
})
barScene.on('text', async (ctx) =>{
    const barAmount = ctx.message.text;
    ctx.session.Menu.Bar = barAmount;
    return ctx.scene.leave();
})
barScene.leave(async (ctx) => {
    await ctx.reply('Бара в заказе: ' + (ctx.session.Menu.Bar || 'Не установлено'), removeKeyboard);
})

const stage = new Stage([emailScene, phoneScene, pizzaScene, japanScene, barScene]);
stage.hears('back', async ctx => await ctx.scene.leave());
module.exports = stage;
