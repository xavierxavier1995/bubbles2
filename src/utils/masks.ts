export const unmask = (value: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco)
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
    .replace(/(-\d{2})\d+?$/, '$1'); // Captura 2 números seguidos de um traço e não deixa ser digitado mais nada
};

export const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskCpfCnpj = (value: string) => {
  const cleanValue = unmask(value);
  if (cleanValue.length <= 11) {
    return maskCPF(cleanValue);
  }
  return maskCNPJ(cleanValue);
};

export const maskPhone = (value: string) => {
  let cleanValue = unmask(value);
  
  // Limita a 11 dígitos
  if (cleanValue.length > 11) {
    cleanValue = cleanValue.slice(0, 11);
  }

  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  
  return cleanValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};
