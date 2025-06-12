import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn }) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));

        // Cargar datos globales y predeterminados
        const globalConfig = data.global;
        const defaultConfig = data.default;

        const botName = globalConfig.botName || defaultConfig.botName;
        const currency = globalConfig.currency || defaultConfig.currency;
        const videos = globalConfig.videos.length > 0 ? globalConfig.videos : defaultConfig.videos;

        const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)];

        const menuMessage = `
╔═══════════════════
║ 🥷🏻  ${botName} 
║ 👨🏻‍💻 𝘿𝙚𝙨𝙖𝙧𝙤𝙡𝙡𝙖𝙙𝙤 𝙥𝙤𝙧: ${dev}
║ 🔰 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: ${vs}
╚═══════════════════

💬¡Hola ! Soy ${botName}, aquí tienes la lista de comandos¡!
💰 Moneda actual: ¥ ${currency}

𝑻𝒆 𝑫𝒆𝒋𝒐 𝑵𝒖𝒆𝒔𝒕𝒓𝒐 𝑪𝒂𝒏𝒂𝒍 𝑶𝒇𝒊𝒄𝒊𝒂𝒍 ➪https://whatsapp.com/channel/0029VbAoNZxDZ4Lk1WmUyZ3I

╔════ ≪ 𖣘 ≫ ════╗
│ 👑 𝘾𝙍𝙀𝘼𝘿𝙊𝙍𝙀𝙎-𝙈𝘿 👑
│ ➣ .setname 🖋️
│ ➣ .setbanner 🖼️
│ ➣ .setmoneda 🪙
│ ➣ .viewbanner 📄
│ ➣ .deletebanner 🚮
│ ➣ .resetpreferences 🔃
╚════ ≪ 𖣘 ≫ ════╝

╔════ ≪ 𖣘 ≫ ════╗
│ ⚙️ 𝘼𝘿𝙈𝙄𝙉𝙄𝙎𝙏𝙍𝘼𝘾𝙄𝙊𝙉 ⚙️
│ ➣ .ban ➩ .kick 🚫 Expulsa a los usuarios (Solo Admins)
│ ➣ .getplugin 🔌
│ ➣ .getpack 📦
│ ➣ .store 🏪
│ ➣ .status 🖥️
│ ➣ .ping 📍
╚════ ≪ 𖣘 ≫ ════╝

╭───── • 𖣘 • ─────╮
  🚀 𝙎𝙀𝙍 𝙎𝙐𝘽-𝘽𝙊𝙏 🚀
       ➣ .code 
╰───── • 𖣘 • ─────╯

╔════ ≪ 𖣘 ≫ ════╗
│   🎲 𝙍𝘼𝙉𝘿𝙊𝙈 🎲
│ ➣ .rw ➩ .rollwaifu 🧸
│ ➣ .winfo 🧸
│ ➣ .c ➩ .claim 💡
│ ➣ .harem 🧸
│ ➣ .addrw 📝
│ ➣ .alya ➩ .bot 🤖
│ ➣ .kaori ❤️
╚════ ≪ 𖣘 ≫ ════╝

╔════ ≪  ≫ ════╗
│ 📥 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎 📥
│ ➣ .play ➩ nombre de la canción 🎶 (audio)
│ ➣ .play2 ➩ nombre de la canción 🎥 (video)
│ ➣ .tt ➩ .tiktok ➩ enlace de TikTok 🎞️
│ ➣ .sp ➩ .Spotify enlace de Spotify 🎼
│ ➣ .fb ➩ link de facebook 🎥 (video)
╚════ ≪ 𖣘 ≫ ════╝

╔════ ≪ 𖣘 ≫ ════╗
│  🔱 𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼 🔱
│ ➣ .w ➩ .work 👷🏻‍♂️
│ ➣ .slut 😈
│ ➣ .robar 👨🏻‍💻
│ ➣ .deposit (cantidad) 🏦
│ ➣ .retirar (cantidad) 🏧
│ ➣ .transferir (cantidad) @usuario 📨
│ ➣ .perfil 🆔
​​╚════ ≪ 𖣘 ≫ ════╝

╔════ ≪ 𖣘 ≫ ════╗
│⛩️ 𝙍𝙀𝘼𝘾𝙄𝙊𝙉𝙀𝙎 𝘼𝙉𝙄𝙈𝙀 ⛩️
│ ➣ .abrazar 🫂
│ ➣ .aburrido 🙇🏻‍♂️
│ ➣ .bañarse 🛀🏻
│ ➣ .bleh 🤸🏻‍♂️
│ ➣ .comer 🍙
│ ➣ .dance 💃🕺
│ ➣ .enojado 🤦🏻‍♂️
│ ➣ .feliz 😊
│ ➣ .kiss 💋
│ ➣ .love ❤️
│ ➣ .matar 🔪
│ ➣ .morder 🦷
│ ➣ .nalguear 🍑
│ ➣ .punch 👊
│ ➣ .saludar 👋
│ ➣ .bofetada 🖐️
│ ➣ .dormir 🛌🏻
╚════ ≪ 𖣘 ≫ ════╝

┏━━━━ • ⍟ • ━━━━┓
│ 🏆 𝙎𝙊𝙇𝙊 𝙊𝙒𝙉𝙀𝙍 🏆 
│ ➣ .update ☯︎
│ ➣ .dsowner ➩ .purgar 🗑️
│ ➣ .join 💎
┗━━━━ • ⍟ • ━━━━┛

> ${copy} Hecho con mucho amor por ${dev}
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

/* estilos de menu

┎───•✧•───⌬
┃
┖───•✧•  */