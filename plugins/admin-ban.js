const handler = async (m, { conn, participants, args, isBotAdmin, isAdmin, command }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.');
  if (!isAdmin) return m.reply('❌ Solo los administradores pueden usar este comando.');
  if (!isBotAdmin) return m.reply('❌ El bot necesita ser administrador para poder eliminar.');

  let user;
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    user = m.mentionedJid[0];
  } else if (args[0]) {
    const number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    user = number;
  } else if (m.quoted) {
    user = m.quoted.sender;
  } else {
    return m.reply('❌ Etiqueta, responde a un mensaje o escribe el número del usuario que deseas eliminar.');
  }

  // Verifica que no sea admin
  const groupData = await conn.groupMetadata(m.chat);
  const isUserAdmin = groupData.participants.find(p => p.id === user)?.admin;
  if (isUserAdmin) return m.reply('❌ No puedo eliminar a un administrador.');

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    m.reply(`✅ Usuario eliminado correctamente.`);
  } catch (e) {
    m.reply('❌ Ocurrió un error al intentar eliminar al usuario.');
    console.log(e);
  }
};

handler.command = ['kick', 'ban', 'echar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;