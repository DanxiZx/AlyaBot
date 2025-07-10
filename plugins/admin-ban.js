import fetch from 'node-fetch';

const handler = async (m, { conn, args, isAdmin, isBotAdmin, participants }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.');
  if (!isAdmin) return m.reply('❌ Solo los administradores pueden usar este comando.');
  if (!isBotAdmin) return m.reply('❌ El bot necesita ser administrador.');

  let user;
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    user = m.mentionedJid[0];
  } else if (args[0]) {
    user = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  } else if (m.quoted) {
    user = m.quoted.sender;
  } else {
    return m.reply('❌ Etiqueta, responde o escribe el número del usuario que deseas expulsar.');
  }

  // Evitar expulsar a un admin
  const target = participants.find(p => p.id === user);
  if (target?.admin) return m.reply('❌ No puedo expulsar a un administrador.');

  // Obtener foto de perfil
  let pp = await conn.profilePictureUrl(user, 'image').catch(_ => 'https://files.catbox.moe/rblv23.jpg');
  let img = await (await fetch(pp)).buffer();

  // Obtener nombre del usuario
  let usuarioTag = `@${user.split('@')[0]}`;

  let mensaje = `
┏━━━━❖━━━✦━━━❖━━━━┓
┃⛔ 𝐄𝐗𝐏𝐔𝐋𝐒𝐀𝐃𝐎 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 ⛔
┗━━━━❖━━━✦━━━❖━━━━┛
╔══════════════════════════════╗
${usuarioTag} 𝐅𝐮𝐞 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐝𝐨 𝐩𝐨𝐫 𝐬𝐮 𝐜𝐨𝐦𝐩𝐨𝐫𝐭𝐚𝐦𝐢𝐞𝐧𝐭𝐨.

🧹 𝐋𝐢𝐦𝐩𝐢𝐚𝐧𝐝𝐨 𝐞𝐥 𝐠𝐫𝐮𝐩𝐨...
😌 𝐀𝐡𝐨𝐫𝐚 𝐡𝐚𝐲 𝐩𝐚𝐳... 𝐜𝐫𝐞𝐨.
╚══════════════════════════════╝`;

  // Enviar mensaje con imagen
  await conn.sendMessage(m.chat, {
    image: img,
    caption: mensaje,
    mentions: [user]
  });

  // Ejecutar expulsión
  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
  } catch (err) {
    console.log(err);
    m.reply('❌ No pude expulsar al usuario.');
  }
};

handler.command = ['kick', 'echar', 'ban'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;