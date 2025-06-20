// Brayan x Clarita 💞


import axios from 'axios';

let yeon = async (m, { conn, text, usedPrefix, command }) => {
    const args = text.trim().split(/\s*\|\s*/);
    
    if (args.length < 2) return conn.sendMessage(m.chat, {
        text: `🚫 *Formato incorrecto, Senpai!*  
Usa: *${usedPrefix + command}* <título>|<texto>  
Ejemplo: *${usedPrefix + command}* NGL|Hola, ¿cómo estás?`
    });

    const title = args[0];
    const textInput = args[1];

    try {
        const response = await axios.get(`https://flowfalcon.dpdns.org/imagecreator/ngl?title=${encodeURIComponent(title)}&text=${encodeURIComponent(textInput)}`, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
            }
        });

        await conn.sendMessage(m.chat, {
            image: Buffer.from(response.data, 'binary'),
            caption: `✨ *¡Imagen generada con éxito, Senpai!*  
📌 *Título:* ${title}  
📝 *Texto:* _${textInput}_`
        });
    } catch (e) {
        console.error('Error:', e.message);
        let errorMsg = `⚠️ *Ups, ocurrió un error, Senpai!*  
Vuelve a intentarlo más tarde, el servidor está algo inestable 😅`;

        if (e.response?.status === 400) {
            errorMsg = `🚫 *Senpai*, asegúrate de completar el título y el texto correctamente.  
Ejemplo: *${usedPrefix + command}* NGL|Hola, soy Yeon`;
        }

        await conn.sendMessage(m.chat, { text: errorMsg });
    }
};

yeon.help = ['fakengl <título>|<texto>'];
yeon.tags = ['maker'];
yeon.command = /^fakengl$/i;
yeon.limit = true;

export default yeon;