// src/services/clickupService.ts

// Interface baseada no novo formulário
export interface LeadFormData {
  nome?: string;
  email?: string;
  telefone?: string;
  possui_cnpj?: string;
  utiliza_erp?: string;
  cnpj?: string;
  cidade_estabelecimento?: string;
  cidade_atuacao?: string;
  // Campo de investimento mantido como opcional caso volte a ser usado para a regra de negócio
  investimento?: string; 
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  full_url?: string;
}

interface ClickUpResponse {
  success: boolean;
  status: string;
  message: string;
  error_data?: any;
}

/**
 * Função 1: Recebe e normaliza os dados do formulário
 */
function normalizeData(data: LeadFormData) {
  const sanitize = (value?: string) => {
    if (!value) return "Não informado";
    // Remove tags HTML e espaços extras
    return value.replace(/<[^>]*>?/gm, '').trim() || "Não informado";
  };

  return {
    nome: sanitize(data.nome),
    email: sanitize(data.email),
    telefone: sanitize(data.telefone),
    possui_cnpj: sanitize(data.possui_cnpj),
    utiliza_erp: sanitize(data.utiliza_erp),
    cnpj: sanitize(data.cnpj),
    cidade_estabelecimento: sanitize(data.cidade_estabelecimento),
    cidade_atuacao: sanitize(data.cidade_atuacao),
    investimento: sanitize(data.investimento),
    utm_source: sanitize(data.utm_source),
    utm_medium: sanitize(data.utm_medium),
    utm_campaign: sanitize(data.utm_campaign),
    utm_term: sanitize(data.utm_term),
    utm_content: sanitize(data.utm_content),
    full_url: sanitize(data.full_url),
  };
}

/**
 * Função 2: Monta o markdown_description adaptado ao novo formulário
 */
function buildMarkdownDescription(data: ReturnType<typeof normalizeData>): string {
  return `
**Nome:**
${data.nome}

**E-mail:**
${data.email}

**Telefone/WhatsApp:**
${data.telefone}

**Possui CNPJ?**
${data.possui_cnpj}

**CNPJ:**
${data.cnpj}

**Utiliza ERP?**
${data.utiliza_erp}

**Cidade do Estabelecimento:**
${data.cidade_estabelecimento}

**Cidade de Atuação:**
${data.cidade_atuacao}

**Capacidade de Investimento:**
${data.investimento}

---
**Dados de Rastreamento (UTMs):**
- **Source:** ${data.utm_source}
- **Medium:** ${data.utm_medium}
- **Campaign:** ${data.utm_campaign}
- **Term:** ${data.utm_term}
- **Content:** ${data.utm_content}

**URL Completa:**
${data.full_url}
`.trim();
}

/**
 * Função 3: Envia a tarefa ao ClickUp
 */
export async function createLeadTask(rawFormData: LeadFormData): Promise<ClickUpResponse> {
  // 1. Normaliza os dados
  const leadData = normalizeData(rawFormData);

  // 2. Aplica Regra de Negócio Condicional
  // Adaptado: Se o investimento for "Abaixo de 5.000,00", não cria a tarefa.
  // (Caso o campo não exista no form atual, essa regra simplesmente não será ativada, 
  // mas a lógica fica pronta conforme solicitado).
  if (leadData.investimento === "Abaixo de 5.000,00") {
    return {
      success: true,
      status: "skipped",
      message: "Lead não qualificado para o ClickUp devido ao baixo investimento. Fluxo alternativo acionado."
    };
  }

  // 3. Prepara as configurações (usando variáveis de ambiente)
  const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN;
  const LIST_ID = process.env.CLICKUP_LIST_ID;
  const DEFAULT_STATUS = process.env.CLICKUP_DEFAULT_STATUS || "NOVOS";
  const DEFAULT_TAGS = process.env.CLICKUP_DEFAULT_TAGS ? process.env.CLICKUP_DEFAULT_TAGS.split(',') : ["tráfego"];

  console.log("[CLICKUP SERVICE] Verificando credenciais...");
  if (!CLICKUP_TOKEN || !LIST_ID) {
    console.error("[CLICKUP SERVICE] ERRO: Token ou List ID ausentes.");
    throw new Error("Configurações do ClickUp (Token ou List ID) ausentes no servidor.");
  }

  // 4. Monta o Payload
  const description = buildMarkdownDescription(leadData);
  
  const payload = {
    name: leadData.nome,
    markdown_description: description,
    status: DEFAULT_STATUS,
    tags: DEFAULT_TAGS
  };

  console.log("[CLICKUP SERVICE] Enviando payload para o ClickUp:", JSON.stringify(payload, null, 2));

  // 5. Faz a requisição para a API do ClickUp
  try {
    const response = await fetch(`https://api.clickup.com/api/v2/list/${LIST_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log("[CLICKUP SERVICE] Resposta da API do ClickUp:", response.status, JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error("[CLICKUP SERVICE] Falha ao criar tarefa:", responseData);
      return {
        success: false,
        status: "error",
        message: "Falha ao criar tarefa no ClickUp.",
        error_data: responseData
      };
    }

    return {
      success: true,
      status: "created",
      message: "Tarefa criada com sucesso no ClickUp!",
      error_data: responseData // Opcional: retornar os dados da task criada
    };

  } catch (error: any) {
    return {
      success: false,
      status: "error",
      message: "Erro de rede ou falha na integração com ClickUp.",
      error_data: error.message
    };
  }
}
