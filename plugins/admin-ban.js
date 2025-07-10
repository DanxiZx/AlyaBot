const handler = async (m, { conn, text, participants, quoted, isAdmin }) => {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupParticipants = groupMetadata.participants;
    const groupAdmins = groupParticipants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);

    const botNumber = conn.user.jid || conn.user.id || conn.decodeJid(conn.user?.id);
    const botParticipant = groupParticipants.find(p => p.id === botNumber);
    const isBotAdmin = botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin';

    if (!isAdmin) {
        return m.reply('❌ Este comando es solo para Admins.');
    }

    if (!isBotAdmin) {
        return m.reply('❌ Necesito ser Admin para que puedas usar este comando.');
    }

    let target;
    if (m.mentionedJid?.length) {
        target = m.mentionedJid[0];
    } else if (quoted) {
        target = quoted.sender;
    } else if (text) {
        target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    } else {
        return m.reply('❌ Por favor, menciona, responde o escribe el número del usuario para expulsarlo.');
    }

    const isMember = groupParticipants.find(p => p.id === target);
    if (!isMember) return m.reply('❌ El usuario no está en el grupo.');

    if (groupAdmins.includes(target)) return m.reply('❌ No puedes expulsar a un administrador.');

    try {
        await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
        m.reply(`✅ El usuario @${target.split('@')[0]} ha sido expulsado del grupo.`, null, {
            mentions: [target],
        });
    } catch (err) {
        m.reply(`❌ Error al intentar expulsar al usuario:\n${err.message}`);
    }
};

handler.command = /^(kick|ban)$/i;
handler.group = true;
handler.admin = true;

export default handler;