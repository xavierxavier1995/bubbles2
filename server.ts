import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createLeadTask } from "./src/services/clickupService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware para parsear JSON no body
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/leads", async (req, res) => {
    console.log("[SERVER] Recebendo requisição em /api/leads");
    console.log("[SERVER] Body recebido:", JSON.stringify(req.body, null, 2));
    try {
      const result = await createLeadTask(req.body);
      console.log("[SERVER] Resultado do ClickUpService:", JSON.stringify(result, null, 2));
      
      if (!result.success) {
        // Fluxo alternativo (ex: regra de negócio barrou a criação)
        return res.status(200).json(result);
      }

      return res.status(201).json(result);
    } catch (error: any) {
      console.error("[SERVER] Erro ao processar lead:", error);
      return res.status(500).json({
        success: false,
        status: "error",
        message: "Erro interno ao processar o lead.",
        error_data: error.message
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
