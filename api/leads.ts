import { createLeadTask } from '../src/services/clickupService.js';

export default async function handler(req: any, res: any) {
  // Configurando CORS caso necessário
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log("[VERCEL API] Recebendo requisição em /api/leads");
  console.log("[VERCEL API] Body recebido:", JSON.stringify(req.body, null, 2));
  
  try {
    const result = await createLeadTask(req.body);
    console.log("[VERCEL API] Resultado do ClickUpService:", JSON.stringify(result, null, 2));
    
    if (!result.success) {
      return res.status(200).json(result);
    }

    return res.status(201).json(result);
  } catch (error: any) {
    console.error("[VERCEL API] Erro ao processar lead:", error);
    return res.status(500).json({
      success: false,
      status: "error",
      message: "Erro interno ao processar o lead.",
      error_data: error.message
    });
  }
}
