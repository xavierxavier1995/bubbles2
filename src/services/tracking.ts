// Servico centralizado de tracking (dataLayer / Google Tag Manager)

export interface LeadUserData {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
}

export interface PushLeadParams {
  candidacyId: string;
  formName: string;
  qualified: boolean;
  user?: LeadUserData;
}

function push(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

function normalizePhone(rawPhone?: string): string | undefined {
  if (!rawPhone) return undefined;
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return undefined;

  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    return digits;
  }
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

function parseNames(rawName?: string): { firstName?: string; lastName?: string } {
  if (!rawName) return {};
  const cleaned = rawName.trim().toLowerCase();
  if (!cleaned) return {};

  const parts = cleaned.split(/\s+/);
  const firstName = parts[0] || undefined;
  const lastName = parts.slice(1).join(' ') || undefined;

  return { firstName, lastName };
}

function normalizeEmail(rawEmail?: string): string | undefined {
  if (!rawEmail) return undefined;
  const cleaned = rawEmail.trim().toLowerCase();
  return cleaned || undefined;
}

function normalizeCity(rawCity?: string): string | undefined {
  if (!rawCity) return undefined;
  const cleaned = rawCity.trim().toLowerCase();
  return cleaned || undefined;
}

export function pushLead({ candidacyId, formName, qualified, user }: PushLeadParams): void {
  const userData: Record<string, string> = {};

  if (user) {
    const email = normalizeEmail(user.email);
    if (email) userData.email = email;

    const phone = normalizePhone(user.phone);
    if (phone) userData.phone_number = phone;

    const { firstName, lastName } = parseNames(user.name);
    if (firstName) userData.first_name = firstName;
    if (lastName) userData.last_name = lastName;

    const city = normalizeCity(user.city);
    if (city) userData.city = city;
  }

  const payload: Record<string, unknown> = {
    event: 'lead_form_submitted',
    event_id: `lead.${candidacyId}`,
    lead_id: candidacyId,
    form_name: formName,
    lead_qualified: qualified,
    ...(Object.keys(userData).length > 0 ? { user_data: userData } : {})
  };

  push(payload);
}

export function pushPageView(path: string, title?: string): void {
  push({
    event: 'page_view',
    page_path: path,
    page_title: title || (typeof document !== 'undefined' ? document.title : undefined)
  });
}

export function pushWhatsappClick(location: string): void {
  push({
    event: 'whatsapp_click',
    click_location: location
  });
}

export function pushFormOpen(formName: string): void {
  push({
    event: 'form_open',
    form_name: formName
  });
}
