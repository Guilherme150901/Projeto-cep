export const maskCep = (value: string) => {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/(\d{5})(\d)/, "$1-$2") // coloca o traço depois do 5º dígito
    .slice(0, 9); // limita no máximo 9 caracteres
};