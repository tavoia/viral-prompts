import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const BLOQUES = [
  { key: "bloque1", label: "Bloque 1 · 6 seg", titulo: "Hook — Gancha la atención" },
  { key: "bloque2", label: "Bloque 2 · 6 seg", titulo: "Desarrollo — La situación" },
  { key: "bloque3", label: "Bloque 3 · 6 seg", titulo: "Escalada — El giro cómico" },
  { key: "bloque4", label: "Bloque 4 · 6 seg", titulo: "Remate — El golpe final" },
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);

  async function generate() {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al generar");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function copyBlock(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <>
      <Head>
        <title>Tavo Agente de Prompts Virales</title>
        <meta name="description" content="Genera prompts virales para TikTok e Instagram" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>🎬 Tavo Agente de Prompts Virales</h1>
            <p>Humor y entretenimiento · 4 bloques × 6 seg = 24 seg</p>
          </div>

          <div className={styles.inputRow}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="Ej: Un gato que intenta usar el ordenador..."
              className={styles.input}
            />
            <button
              onClick={generate}
              disabled={loading || !topic.trim()}
              className={styles.btn}
            >
              {loading ? "Generando..." : "Generar ✦"}
            </button>
          </div>

          <div className={styles.progress}>
            {BLOQUES.map((b, i) => (
              <span key={i} className={styles.progressItem}>
                <span className={`${styles.dot} ${result ? styles.dotDone : ""}`} />
                <span className={styles.seg}>6s</span>
              </span>
            ))}
            <span className={styles.total}>= 24 seg</span>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.grid}>
            {BLOQUES.map((b) => (
              <div
                key={b.key}
                className={`${styles.card} ${result ? styles.cardActive : ""}`}
              >
                <span className={styles.badge}>{b.label}</span>
                <p className={styles.cardTitle}>{b.titulo}</p>
                <p className={`${styles.cardBody} ${!result ? styles.cardEmpty : ""}`}>
                  {result ? result[b.key]?.prompt : loading ? "Generando..." : "Escribe tu idea y pulsa Generar"}
                </p>
                {result && result[b.key]?.prompt && (
                  <button
                    className={styles.copyBtn}
                    onClick={() => copyBlock(result[b.key].prompt, b.key)}
                  >
                    {copied === b.key ? "¡Copiado!" : "Copiar"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {result && (result.hashtags || result.sonido) && (
            <div className={styles.extras}>
              {result.hashtags && <p><strong>Hashtags:</strong> {result.hashtags}</p>}
              {result.sonido && <p><strong>Sonido sugerido:</strong> {result.sonido}</p>}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
