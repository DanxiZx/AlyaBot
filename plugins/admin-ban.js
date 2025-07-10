const handler = async (m, { conn, text, quoted, participants, isAdmin }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupParticipants = groupMetadata.participants;
  const groupAdmins = groupParticipants.filter(p => p.admin).map(p => p.id);

  // ✅ Detectar correctamente el ID del bot
  const botId = conn.user?.id?.split(':')[0] + '@s.whatsapp.net';
  const botData = groupParticipants.find(p => p.id === botId);
  const isBotAdmin = botData?.admin === 'admin' || botData?.admin === 'superadmin';

  console.log('BOT ID:', botId);
  console.log('¿Bot es admin?:', isBotAdmin);

  if (!isAdmin) {
    return m.reply('❌ Este comando es solo para administradores.');
  }

  if (!isBotAdmin) {
    return m.reply('❌ El bot necesita ser administrador del grupo.');
  }

  let target;
  if (m.mentionedJid?.length) {
    target = m.mentionedJid[0];
  } else if (quoted) {
    target = quoted.sender;
  } else if (text) {
    target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  } else {
    return m.reply('❌ Menciona, responde o escribe el número del usuario a expulsar.');
  }

  const targetMember = groupParticipants.find(p => p.id === target);
  if (!targetMember) return m.reply('❌ El usuario no está en el grupo.');
  if (targetMember.admin) return m.reply('❌ No puedes expulsar a un administrador.');

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
    await m.reply(`✅ Usuario @${target.split('@')[0]} expulsado.`, null, { mentions: [target] });
  } catch (e) {
    m.reply(`❌ Error al expulsar: ${e.message}`);
  }
};

handler.command = /^(kick|ban)$/i;
handler.group = true;
handler.admin = true;

export default handler;