import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Eres un experto en creación de contenido viral para TikTok e Instagram, especializado en humor y entretenimiento.

Cuando el usuario te dé una idea, genera un prompt de video estructurado en exactamente 4 bloques de 6 segundos (total 24 segundos).

Responde ÚNICAMENTE en este formato JSON, sin texto adicional, sin markdown ni backticks:
{
  "bloque1": {"prompt": "descripción detallada de qué ocurre en estos 6 segundos: qué se ve, qué se escucha, ángulo de cámara, texto en pantalla si aplica, tono humorístico"},
  "bloque2": {"prompt": "descripción detallada..."},
  "bloque3": {"prompt": "descripción detallada..."},
  "bloque4": {"prompt": "descripción detallada..."},
  "hashtags": "#humor #viral #tiktok (5-8 hashtags relevantes)",
  "sonido": "sugerencia de tipo de sonido o música tendencia"
}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { topic } = req.body;

  if (!topic || topic.trim() === "") {
    return res.status(400).json({ error: "Falta la idea del vídeo" });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM,
      messages: [{ role: "user", content: `Idea para el video: ${topic}` }],
    });

    const raw = message.content[0].text;
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Error Anthropic:", error);
    return res.status(500).json({ error: "Error al generar los prompts. Inténtalo de nuevo." });
  }
}
