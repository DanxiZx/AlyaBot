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

╔═══[ 🤖 *RiasanBotv2* ]════╗
║ 🧑‍💻 Dev: ${dev}
║ 🧾 Versión: ${vs}
║ ☁️ Sistema: servidor 
╚══════════════════════╝

╔═══[ 💬 Bienvenido ]═══╗
║ Hola, soy *RiasanBotv2*.
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

╔═══[🎲 𝙍𝘼𝙉𝘿𝙊𝙈 𝙓𝘿]═══╗
║ 🎴 .rw — Ruleta Waifu
║ 📌 .winfo — Info aleatoria
║ 🎟️ .rollwaifu — Roll waifu
║ 🧧 .claim — Reclamar
║ 💖 .harem — Mi harem
║ 📒 .addrw — Añadir waifu
║ 🤖 .Rias / .bot — Bot Info
║ 🌸 .kaori — Estilo waifu
║ 🩷 .Waifu — Imagen Waifu
║ 💬 .fakengl — Texto Fake
║ 🍟 .lolice  – imagen Fake
╚══════════════════════╝

╔═══[ 📥 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎 ]═══╗
║ 🎶 .playaudio — Audio MP3
║ 🎞️ .ytmp4 — YouTube Video
║ 🎬 .tt — TikTok Video
║ 🎧 .sp — Spotify Track
╚════════════════════╝

╔═══[ 💰 𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼 𝘽𝙀𝙏𝘼 ]═══╗
║ 👩🏻‍🔧 .work — Trabajar
║ 😏 .slut — Riesgo
║ 🧟‍♂️ .robar — Robar
║ 🏦 .deposit — Depositar
║ 🏧 .retirar — Retirar
║ 💸 .transferir — Enviar
║ 🪪 .perfil — Perfil
╚════════════════════╝

╔═══[ ⛩️ 𝘼𝙉𝙄𝙈𝙀&𝙍𝙀𝘼𝘾𝙏 ]═══╗
║ 💋 .abrazar — Abrazar
║ 💋 .bañarse — Bañarse
║ 💋 .aburrido — Aburrido
║ 💋 .comer — Comer
║ 💋 .dance — Bailar
║ 💋 .enojado — Enojarse
║ 💋 .feliz — Feliz
║ 💋 .kiss — Besar
║ 💋 .matar — Matar
║ 💋 .punch — Golpear
║ 💋 .nalguear — Nalgada
║ 💋 .dormir — Dormir
╚═════════════════════╝

🚀 *${copy} ɪɴsᴘɪʀᴀᴅᴏ ᴘᴏʀ  ${dev}*

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