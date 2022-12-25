const rl = require('readline-sync');
const mineflayer = require('mineflayer')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')

let username = rl.question('Kullanici adi: ');
let authme = rl.question('Authme var mi? (E/H): ');
authme = authme.toUpperCase();
let password = authme === 'E' ? rl.question('Sifre: ') : null;
let server = rl.question('Sunucu IP: ');
let port = rl.question('Sunucu Port: ');
let view = rl.question('Goruntulemek istiyor musun? (E/H): ');
view = view.toUpperCase();

const bot = mineflayer.createBot({
    host: server,
    port: port,
    username: username,
    password: password,
    version: false,
});

bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`${username}: ${message}`);
});

bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn));
bot.on('error', err => console.log(err));

bot.on('login', () => {
    console.log(`${bot.username} giriş yaptı!`);
});

bot.on('spawn', () => {
    console.log(`${bot.username} sunucuya giriş yaptı!`);
    if (view === 'E') {
        let port = rl.question('Goruntuleme portu: ');
        mineflayerViewer(bot, { port: port, firstPerson: false })
        console.log('Goruntuleme baslatildi!' + ' http://localhost:' + port);
    }
});

bot.on('end', () => {
    console.log(`${bot.username} sunucudan çıkış yaptı!`);
});