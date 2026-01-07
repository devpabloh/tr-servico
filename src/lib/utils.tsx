export function numeroPorExtenso(numero: string | number): string {
  const num = typeof numero === 'string' ? parseInt(numero, 10) : numero;

  if (isNaN(num) || num < 0) return '';
  if (num === 0) return 'zero';

  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const especiais = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  if (num < 10) return unidades[num];
  if (num < 20) return especiais[num - 10];
  if (num < 100) {
    const d = Math.floor(num / 10);
    const u = num % 10;
    return dezenas[d] + (u > 0 ? ' e ' + unidades[u] : '');
  }
  if (num < 1000) {
    if (num === 100) return 'cem';
    const c = Math.floor(num / 100);
    const resto = num % 100;
    if (resto === 0) return centenas[c];
    return centenas[c] + ' e ' + numeroPorExtenso(resto);
  }

  return num.toString();
}