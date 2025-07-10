import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn }) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    const globalConfig = data.global || {};
    const defaultConfig = data.default || {};

    const botName = globalConfig.botName || defaultConfig.botName || 'RiasanBotv2';
    const dev = globalConfig.dev || defaultConfig.dev || 'erenxsit';
    const vs = globalConfig.version || defaultConfig.version || '1.0.0';
    const currency = globalConfig.currency || defaultConfig.currency || '¥';
    const videos = globalConfig.videos?.length ? globalConfig.videos : defaultConfig.videos || [];
    const copy = globalConfig.copy || defaultConfig.copy || 'RiasanTeam';

    const randomVideoUrl = videos.length > 0
      ? videos[Math.floor(Math.random() * videos.length)]
      : 'https://telegra.ph/file/9c84e6cb7d6e45cfbe69b.mp4';

    // ✅ Usa los plugins ya cargados en memoria (global.plugins)
    const plugins = Object.values(global.plugins).filter(p => p?.help && p?.tags);

    const categorized = {};
    for (const plugin of plugins) {
      for (const tag of plugin.tags) {
        if (!categorized[tag]) categorized[tag] = [];
        for (const helpText of plugin.help) {
          categorized[tag].push(`.${helpText}`);
        }
      }
    }

    // 🧾 Construcción del menú
    let menu = `╭━━〔 🤖 *${botName}* 〕━━⬣
┃👑 *Developer:* ${dev}
┃📦 *Versión:* ${vs}
┃💸 *Moneda:* ${currency}
╰━━━━━━━━━━━━━━━⬣\n\n`;

    for (const [tag, cmds] of Object.entries(categorized)) {
      menu += `╭━━〔 📂 *${tag.toUpperCase()}* 〕━━⬣\n`;
      for (const cmd of cmds) {
        menu += `┃➤ ${cmd}\n`;
      }
      menu += `╰━━━━━━━━━━━━━━━⬣\n\n`;
    }

    menu += `🔖 *${copy} — By ${dev}*`;

    // 📤 Envío como video decorado
    await conn.sendMessage(m.chat, {
      video: { url: randomVideoUrl },
      gifPlayback: true,
      caption: menu,
      mentions: [m.sender]
    });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, `❌ Error al cargar el menú: ${err.message}`, m);
  }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'help'];

export default handler;