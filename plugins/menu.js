import fs from 'fs';
import path from 'path';
import { readdirSync } from 'fs';

const filePath = './personalize.json';
const pluginFolder = './plugins'; // Cambia si tu carpeta es diferente

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
    const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)] || 'https://telegra.ph/file/9c84e6cb7d6e45cfbe69b.mp4';

    // 🔍 Detecta automáticamente los plugins
    const categories = {};
    const files = readdirSync(pluginFolder).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const plugin = await import(path.resolve(pluginFolder, file));
      const tags = plugin.default?.tags || [];
      const commands = Array.isArray(plugin.default?.command) ? plugin.default.command : [plugin.default?.command];
      const help = plugin.default?.help || commands.map(c => `.${c}`);

      for (const tag of tags) {
        if (!categories[tag]) categories[tag] = [];
        categories[tag].push(...help);
      }
    }

    // ✨ Crea el cuerpo del menú dinámico
    let menuContent = `╭━━〔 🤖 *${botName}* 〕━━⬣
┃👑 *Developer:* ${dev}
┃📦 *Versión:* ${vs}
┃💸 *Moneda:* ${currency}
╰━━━━━━━━━━━━━━━⬣\n\n`;

    for (const [tag, cmds] of Object.entries(categories)) {
      menuContent += `╭━━〔 📂 *${tag.toUpperCase()}* 〕━━⬣\n`;
      cmds.forEach(cmd => {
        menuContent += `┃➤ ${cmd}\n`;
      });
      menuContent += `╰━━━━━━━━━━━━━━━⬣\n\n`;
    }

    menuContent += `🔖 *${copy} — By ${dev}*`;

    // 📽️ Envía el menú como video decorado
    await conn.sendMessage(m.chat, {
      video: { url: randomVideoUrl },
      gifPlayback: true,
      caption: menuContent,
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