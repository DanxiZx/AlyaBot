import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn }) => { try { const data = JSON.parse(fs.readFileSync(filePath));

// Cargar datos globales y predeterminados
    const globalConfig = data.global;
    const defaultConfig = data.default;

    const botName = globalConfig.botName || defaultConfig.botName;
    const currency = globalConfig.currency || defaultConfig.currency;
    const videos = globalConfig.videos.length > 0 ? globalConfig.videos : defaultConfig.videos;

    const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)];

    const menuMessage = `

┎───•✧•─────⌬ ┃ 🌟  ${botName} ┃ 👨🏻‍💻 𝘿𝙚𝙨𝙖𝙧𝙧𝙤𝙡𝙡𝙖𝙙𝙤 𝙥𝙤𝙧: ${dev} ┃ 🔰 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: ${vs} ┃ 🖥️ 𝙏𝙚𝙧𝙢𝙪𝙭 𝙉𝙪𝙗𝙚 ☁️ ┖─────────────⌬

💬¡Hola ! Soy ${botName}, aquí tienes la lista de comandos¡! 💰 Moneda actual: ¥ ${currency}

> Más Información erenxsit.vercel.app



┎────── ≪ ⭐ ≫ ──────┒ ┃ 𝙎𝙊𝙇𝙊 𝙋𝘼𝙍𝘼 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 ⭐ ┃❀ .setname ✏️ ┃❀ .setbanner 🖼️ ┃❀ .setmoneda 🪙 ┃❀ .viewbanner 📝 ┃❀ .deletebanner 📄 ┃❀ .resetpreferences ⚪ ┖──────────────────┚

┎────── ≪ 🌙 ≫ ──────┒ ┃ 𝘼𝘿𝙈𝙄𝙉𝙄𝙎𝙏𝙍𝘼𝘾𝙄𝙊𝙉 💫 ┃❀ .kick 🚫 ┃❀ .getplugin 🔌 ┃❀ .getpack 📦 ┃❀ .store 🏪 ┃❀ .status 🖥️ ┃❀ .ping 📍 ┃❀ .gemini 🔍 ┃❀ .Pinterest ✨ ┖──────────────────┚

┎────── ≪ 🎲 ≫ ──────┒ ┃ 🎲 𝙍𝘼𝙉𝘿𝙊𝙈 🎲 ┃❀ .rw 🌟 ┃❀ .winfo 🧸 ┃❀ .rollwaifu 🧸 ┃❀ .claim 💡 ┃❀ .harem 💗 ┃❀ .addrw 📝 ┃❀ .alya ➩ .bot 🤖 ┃❀ .kaori ❤️ ┃❀ .Waifu 👄 ┃❀ .fakengl ⚡ ┖──────────────────┚

┎────── ≪ 🔄 ≫ ──────┒ ┃ 📥 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎 📥 ┃❀ .playaudio ➩ (audio)🎶 ┃❀ .ytmp4 ➩ (video)🎬 ┃❀ .tt ➩ .tiktok ➩ enlace de TikTok 🎞️ ┃❀ .sp ➩ .Spotify enlace de Spotify 🎶 ┖──────────────────┚

┎────── ≪ 🎰 ≫ ──────┒ ┃ 🎰 𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼 🎰 ┃❀ .work 👷🏻‍♂️ ┃❀ .slut 😈 ┃❀ .robar 👨🏻‍💻 ┃❀ .deposit (cantidad) 🏦 ┃❀ .retirar (cantidad) 🏧 ┃❀ .transferir (cantidad) @usuario 📨 ┃❀ .perfil 🆔 ┖──────────────────┚

┎────── ≪ ⛩️ ≫ ──────┒ ┃⛩️ 𝙍𝙀𝘼𝘾𝙄𝙊𝙉𝙀𝙎 𝘼𝙉𝙄𝙈𝙀 ⛩️ ┃❀ .abrazar 🫂 ┃❀ .aburrido 🙇🏻‍♂️ ┃❀ .bañarse 🛀🏻 ┃❀ .bleh 🤸🏻‍♂️ ┃❀ .comer 🍙 ┃❀ .dance 💃🕺 ┃❀ .enojado 🤦🏻‍♂️ ┃❀ .feliz 😊 ┃❀ .kiss 💋 ┃❀ .love ❤️ ┃❀ .matar 🔪 ┃❀ .morder 🦷 ┃❀ .nalguear 🍑 ┃❀ .punch 👊 ┃❀ .saludar 👋 ┃❀ .bofetada 🖐️ ┃❀ .dormir 🛌🏻 ┃❀ .smoke 🚬 ┃❀. paja 🍆 ┖──────────────────┚

┎────── ≪ ✨ ≫ ──────┒ ┃ ✨ 𝙎𝙊𝙇𝙊 𝙊𝙒𝙉𝙀𝙍 ✨ ┃❀ .update ⭕ ┃❀ .dsowner ➩ .purgar 🗑️ ┃❀ .join 💎 ┖──────────────────┚

> ${copy} Hecho con mucho amor por ${dev} `;



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

handler.help = ['menu']; handler.tags = ['info']; handler.command = ['menu', 'help'];

export default handler;