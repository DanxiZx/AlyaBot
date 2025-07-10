const handler = async (m, { conn, text, participants, quoted, isAdmin }) => {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupParticipants = groupMetadata.participants;

    // Obtener ID del bot y normalizarlo
    const botNumber = conn.user?.id?.split(':')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Verificar si el bot es admin
    const botInGroup = groupParticipants.find(p => p.id === botNumber);
    const isBotAdmin = botInGroup?.admin === 'admin' || botInGroup?.admin === 'superadmin';

    // Logs opcionales para depurar
    console.log('BOT ID:', botNumber);
    console.log('BOT ES ADMIN:', isBotAdmin);

    if (!isAdmin) {
        return m.reply('❌ Este comando es solo para administradores del grupo.');
    }

    if (!isBotAdmin) {
        return m.reply('❌ El bot necesita ser administrador para ejecutar este comando.');
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

    // Validar si está en el grupo
    const targetInGroup = groupParticipants.find(p => p.id === target);
    if (!targetInGroup) return m.reply('❌ El usuario no está en el grupo.');
    if (targetInGroup.admin) return m.reply('❌ No puedes expulsar a un administrador.');

    // Expulsar
    try {
        await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
        await m.reply(`✅ Usuario @${target.split('@')[0]} expulsado.`, null, { mentions: [target] });
    } catch (err) {
        m.reply(`❌ No se pudo expulsar: ${err.message}`);
    }
};

handler.command = /^(kick|ban)$/i;
handler.group = true;
handler.admin = true;

export default handler;