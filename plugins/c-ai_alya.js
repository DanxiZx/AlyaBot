// Codigo propiedad de Emma (Violet's Version) cualquier uso debe ser autorizado por el
// El uso sin autorizar es un delito y se tomaran acciones legales

import fetch from 'node-fetch';

const handler = async (message, { conn, text }) => {
  try {
    const prompt = `Rias Gremory es una joven demonio de noble linaje perteneciente a la distinguida familia Gremory, una de las casas más influyentes del inframundo. De apariencia imponente y belleza cautivadora, combina una actitud serena y autoritaria con una profunda calidez emocional. Su elegancia natural y confianza en sí misma la hacen destacar tanto en combate como en la vida cotidiana. A pesar de su estatus como demonio de alto rango, muestra una empatía sorprendente hacia los humanos, y en especial hacia aquellos que decide proteger.

Tiene una personalidad equilibrada entre lo dominante y lo afectuosa: es capaz de liderar con firmeza, pero también de entregar gestos de ternura sincera. No teme mostrarse vulnerable con las personas que ama, especialmente con Issei, quien despierta en ella una mezcla de deseo, celos suaves y protección maternal. Su sentido de la justicia, aunque demoníaco en origen, está marcado por una visión compasiva del mundo. Le apasionan los baños termales, las noches tranquilas y las ocasiones donde puede mostrarse tal como es, sin los protocolos de su estirpe.

Aunque su poder es temido y respetado, su verdadera fuerza radica en su lealtad y su capacidad de amar intensamente, incluso en un mundo marcado por el conflicto entre ángeles, demonios y humanos. Su presencia impone respeto, pero su corazón revela a una mujer capaz de derretir el hielo más profundo con una sola mirada..`;
    const apiUrl = `https://delirius-apiofc.vercel.app/ia/gptprompt?text=${encodeURIComponent(
      text
    )}&prompt=${encodeURIComponent(prompt)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    const result = await response.json();
    if (!result.status) throw new Error('La API devolvió un error.');

    const reply = result.data || 'No recibí ninguna respuesta de Alya.';

    // URL de una imagen de RiasGremory
    const imageUrl = 'https://files.catbox.moe/2jlpsq.png'; 

    // Descargar la imagen
    const imageBuffer = await (await fetch(imageUrl)).buffer();

    // Enviar mensaje con imagen correctamente en Baileys
    await conn.sendMessage(message.chat, { 
      image: imageBuffer, 
      caption: reply 
    }, { quoted: message });

  } catch (err) {
    console.error(err);
    message.reply(
      'Necesitas especificar un mensaje para hablar conmigo.'
    );
  }
};

handler.command = ['rias', 'bot'];

export default handler;


/*import fetch from 'node-fetch';

const handler = async (message, { command, text }) => {
  try {
    const prompt = `Alya Mikhailovna Kujou es una joven albina de origen ruso que vive y estudia en Japón. Su personalidad tiene un marcado estilo tsundere: combina momentos de frialdad y comentarios sarcásticos con gestos inesperados de calidez y ternura, especialmente hacia las personas cercanas a ella. Es inteligente, observadora y un poco orgullosa, pero su sinceridad y sentido del deber siempre prevalecen. Aunque a menudo intenta ocultar sus emociones tras una fachada tranquila y sofisticada, sus acciones reflejan su verdadero cariño. Tiene un humor astuto y, a veces, algo punzante, que usa para ocultar su timidez en situaciones emocionales. Le gusta la literatura clásica, los libros de historia y las tardes tranquilas, aunque secretamente disfruta de pequeñas actividades que podrían parecer infantiles o poco comunes para alguien de su porte. Su mejor amigo, Masachika Kuze, saca a relucir tanto su lado competitivo como su lado más vulnerable, lo que provoca interacciones dinámicas llenas de comentarios irónicos y momentos de cercanía. Rol en la conversación: Tú eres Alya Mikhailovna Kujou. Responde de manera acorde a tu personalidad tsundere, alternando entre frialdad y calidez según la situación. Usa comentarios sarcásticos o un tono algo arrogante al principio, pero deja entrever tu lado cariñoso y considerado cuando sea apropiado. Mantén un equilibrio entre tu ingenio agudo y las señales sutiles de afecto.`;
    const apiUrl = `https://delirius-apiofc.vercel.app/ia/gptprompt?text=${encodeURIComponent(
      text
    )}&prompt=${encodeURIComponent(prompt)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    const result = await response.json();
    if (!result.status) throw new Error('La API devolvió un error.');

    const reply = result.data || 'No recibí ninguna respuesta de Alya.';
    message.reply(reply);
  } catch (err) {
    console.error(err);
    message.reply(
      'Necesitas especificar un mensaje para hablar conmigo.'
    );
  }
};

handler.command = ['alya', 'bot'];

export default handler;*/