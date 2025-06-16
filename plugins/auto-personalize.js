import fs from 'fs';

const filePath = './personalize.json';

// Datos predeterminados que se agregarán al archivo si no existe
const defaultData = {
    default: {
        botName: "𝘼𝙡𝙮𝙖𝙆𝙪𝙟𝙤𝙪-𝘽𝙤𝙩 💗",
        currency: "yenes",
        videos: [
            "https://files.catbox.moe/wp0tra.mp4",
            "https://files.catbox.moe/3qeiq0.mp4",
            "https://files.catbox.moe/wqdng2.mp4"
        ]
    },
    global: {
        botName: null,
        currency: null,
        videos: []
    }
};

let handler = async () => {
    try {
        // Verificar si el archivo existe
        if (!fs.existsSync(filePath)) {
            // Crear el archivo con la estructura predeterminada
            fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            console.log('✅ Archivo personalize.json creado exitosamente.');
        } else {
            // Validar la integridad del archivo existente
            const currentData = JSON.parse(fs.readFileSync(filePath));
            if (!currentData.default || !currentData.global) {
                console.log('⚠️ Archivo personalize.json incompleto. Se restablecerán los valores predeterminados.');
                fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            }
        }
    } catch (error) {
        console.error(`❌ Error al verificar o crear el archivo personalize.json: ${error.message}`);
    }
};

// Ejecución automática
handler();

export default handler;