# 🎬 Agente de Prompts Virales

Genera prompts para vídeos virales de TikTok e Instagram en 4 bloques de 6 segundos.

## Instalación local

```bash
npm install
```

Crea un archivo `.env.local` con tu API key:
```
ANTHROPIC_API_KEY=sk-ant-tu-api-key-aqui
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
   - Nombre: `ANTHROPIC_API_KEY`
   - Valor: tu API key de Anthropic
4. Haz clic en Deploy

¡Listo! Vercel te dará una URL pública para compartir con tus usuarios.

---

## Obtener API key de Anthropic

1. Entra en [console.anthropic.com](https://console.anthropic.com)
2. Crea una cuenta gratuita
3. Ve a "API Keys" y crea una nueva key
4. Copia y pégala en Vercel como variable de entorno
