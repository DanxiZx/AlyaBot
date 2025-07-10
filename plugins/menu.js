import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn }) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));

        const globalConfig = data.global;
        const defaultConfig = data.default;

        const botName = globalConfig.botName || defaultConfig.botName;
        const currency = globalConfig.currency || defaultConfig.currency;
        const videos = globalConfig.videos.length > 0 ? globalConfig.videos : defaultConfig.videos;
        const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)];

        const menuMessage = `

╔═══[ 🤖 ${botName} ]════╗
║ 🧑‍💻 Dev: ${dev}
║ 🧾 Versión: ${vs}
║ ☁️ Sistema: Termux Nube
╚══════════════════════╝

╔═══[ 💬 Bienvenido ]═══╗
║ Hola, soy *${botName}*.
║ Moneda actual: ¥ ${currency}
║ Info completa: erenxsit.vercel.app
╚═════════════════════╝


╔═══[ 👑 SOLO CREADOR ]═══╗
║ ⚙️ .setname — Cambiar nombre
║ 🖼️ .setbanner — Definir banner
║ 💱 .setmoneda — Moneda bot
║ 📋 .viewbanner — Ver banner
║ 🗑️ .deletebanner — Eliminar
║ 🔁 .resetpreferences — Reset
╚═══════════════════════╝

╔═══[ 🛡️ ADMINISTRACIÓN ]═══╗
║ 🚫 .kick — Expulsar
║ 📂 .getplugin — Plugin local
║ 📦 .getpack — Paquete ZIP
║ 🏪 .store — Tienda
║ 🖥️ .status — Estado bot
║ 📍 .ping — Ping
║ 🧠 .gemini — IA Gemini
║ 🎨 .Pinterest — Imagenes
╚════════════════════════╝

╔═══[ 🎲 RANDOM FUN ]═══╗
║ 🎴 .rw — Ruleta Waifu
║ 📌 .winfo — Info aleatoria
║ 🎟️ .rollwaifu — Roll waifu
║ 🧧 .claim — Reclamar
║ 💖 .harem — Mi harem
║ 📒 .addrw — Añadir waifu
║ 🤖 .alya / .bot — Bot Info
║ 🌸 .kaori — Estilo waifu
║ 🩷 .Waifu — Imagen Waifu
║ 💬 .fakengl — Texto Fake
╚══════════════════════╝

╔═══[ 📥 DESCARGAS ]═══╗
║ 🎶 .playaudio — Audio MP3
║ 🎞️ .ytmp4 — YouTube Video
║ 🎬 .tt — TikTok Video
║ 🎧 .sp — Spotify Track
╚════════════════════╝

╔═══[ 💰 ECONOMÍA ]═══╗
║ 🧰 .work — Trabajar
║ 😈 .slut — Riesgo
║ 🥷 .robar — Robar
║ 🏦 .deposit — Depositar
║ 🏧 .retirar — Retirar
║ 💸 .transferir — Enviar
║ 🪪 .perfil — Perfil
╚════════════════════╝

╔═══[ ⛩️ REACCIONES ]═══╗
║ 🤗 .abrazar — Abrazar
║ 🛁 .bañarse — Bañarse
║ 🥱 .aburrido — Aburrido
║ 🍙 .comer — Comer
║ 💃 .dance — Bailar
║ 😡 .enojado — Enojarse
║ 😊 .feliz — Feliz
║ 💋 .kiss — Besar
║ 🔪 .matar — Matar
║ 👊 .punch — Golpear
║ 🍑 .nalguear — Nalgada
║ 🛌 .dormir — Dormir
╚═════════════════════╝

🔗 *${copy} Hecho con ❤️ por ${dev}*

`;

        await conn.sendMessage(
            m.chat,
            {
                video: { url: randomVideoUrl },
                gifPlayback: true,
                caption: menuMessage,
                mentions: [m.sender]
            }
        );
    } catch (error) {
        conn.reply(m.chat, `❌ Error al cargar el menú: ${error.message}`, m);
    }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'help'];

export default handler;