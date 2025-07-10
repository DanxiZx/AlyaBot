const handler = async (m, { conn, text, participants, quoted, isAdmin }) => {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupParticipants = groupMetadata.participants;
    const groupAdmins = groupParticipants
        .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
        .map(p => p.id);

    // Obtener el ID del bot en formato correcto
    const botNumber = conn.decodeJid(conn.user.id);
    const botInGroup = groupParticipants.find(p => p.id === botNumber);
    const isBotAdmin = botInGroup?.admin === 'admin' || botInGroup?.admin === 'superadmin';

    if (!isAdmin) {
        return m.reply('❌ Este comando es solo para administradores del grupo.');
    }

    if (!isBotAdmin) {
        return m.reply('❌ El bot necesita ser administrador para usar este comando.');
    }

    // Obtener usuario objetivo
    let target;
    if (m.mentionedJid?.length) {
        target = m.mentionedJid[0];
    } else if (quoted) {
        target = quoted.sender;
    } else if (text) {
        target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else {
        return m.reply('❌ Menciona, responde o escribe el número del usuario para expulsarlo.');
    }

    const isMember = groupParticipants.some(p => p.id === target);
    if (!isMember) return m.reply('❌ El usuario no está en el grupo.');
    if (groupAdmins.includes(target)) return m.reply('❌ No puedes expulsar a otro administrador.');

    try {
        await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
        m.reply(`✅ El usuario @${target.split('@')[0]} ha sido expulsado.`, null, {
            mentions: [target]
        });
    } catch (err) {
        m.reply(`❌ Error al expulsar: ${err.message}`);
    }
};

handler.command = /^(kick|ban)$/i;
handler.group = true;
handler.admin = true;

export default handler;