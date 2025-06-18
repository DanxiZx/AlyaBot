import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, "𝙥𝙤𝙧𝙛𝙖𝙫𝙤𝙧 𝙞𝙣𝙜𝙧𝙚𝙨𝙖 𝙡𝙤 𝙦𝙪𝙚 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙗𝙪𝙨𝙘𝙖𝙧 𝙚𝙣 𝙥𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 🔍.", m);
  let query = text + " hd";
  await m.react("⏳");
  conn.reply(m.chat, '💛 𝑬𝒔𝒑𝒆𝒓𝒂 𝒖𝒏 𝒎𝒐𝒎𝒆𝒏𝒕𝒐 𝒆𝒔𝒕𝒐𝒚 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒏𝒅𝒐 𝑻𝒖𝒔 𝑰𝒎𝒂𝒈𝒆𝒏 ⭐...', m);
  try {
    let { data } = await axios.get(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`);
    let images = data.slice(0, 6).map(item => item.image_large_url);
    let cards = [];
    let counter = 1;
    for (let url of images) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: `Imagen - ${counter++}` }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "Pinterest HD" }),
        header: proto.Message.InteractiveMessage.Header.fromObject({ title: '', hasMediaAttachment: true, imageMessage }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Ver en Pinterest",
              Url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`,
              merchant_url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`
            })
          }]
        })
      });
    }
    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `🍭 Resultado de: ${query}` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: "𝙋𝙄𝙉𝙏𝙀𝙍𝙀𝙎𝙏 𝙃𝘿 𝘽𝙔 𝘼𝙇𝙔𝘼𝙆𝙊𝙐𝙅𝙊𝙐-𝘽𝙊𝙏" }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
          })
        }
      }
    }, { quoted: m });
    await m.react("✅");
    await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, "Ocurrió un error al buscar las imágenes.", m);
  }
};

handler.help = ["pinterest"];
handler.tags = ["descargas"];
handler.command = ['pinterest', 'pin'];

export default handler;