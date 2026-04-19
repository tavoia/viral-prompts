# 🎬 Tavo Agente de Prompts Virales

Genera prompts para vídeos virales de TikTok e Instagram en 4 bloques de 6 segundos.  
Usa **Groq** (Llama 3.3 70B) — completamente gratis, sin tarjeta de crédito.

## Instalación local

```bash
npm install
```

Crea un archivo `.env.local` con tu API key de Groq:
```
GROQ_API_KEY=gsk_tu-api-key-aqui
```

Arranca el servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Despliegue en Vercel (gratis)

1. Sube este proyecto a GitHub
2. Entra en [vercel.com](https://vercel.com) e importa el repositorio
3. En la configuración del proyecto añade la variable de entorno:
   - Nombre: `GROQ_API_KEY`
   - Valor: tu API key de Groq
4. Haz clic en Deploy

---

## Obtener API key de Groq (gratis)

1. Entra en [console.groq.com](https://console.groq.com)
2. Crea una cuenta gratuita (sin tarjeta de crédito)
3. Ve a "API Keys" y crea una nueva key
4. Cópiala y pégala en Vercel como variable de entorno

**Límite gratuito:** 14.400 peticiones/día con el modelo Llama 3.3 70B.
