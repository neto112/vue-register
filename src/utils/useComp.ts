import { format, utcToZonedTime } from "date-fns-tz";

export default function useComposable() {
  function formatDayMonthYear(value: string | Date) {
    if (value) {
      const date = new Date(value);
      const zonedDate = utcToZonedTime(date, 'UTC');
      return format(zonedDate, 'dd/MM/yyyy');
    }
    return ""
  }

  function formatCpf(value: string) {
    if (value) {
      let formatedValue = "";

      formatedValue = value.padStart(11, "0");
      formatedValue = formatedValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4",
      );
      return formatedValue;
    }
  }

  function validateCPF(cpf: string) {
    const cleanedCPF = cpf.replace(/\D/g, '');

    if (cleanedCPF.length !== 11) {
      return false;
    }

    let sum = 0;
    let remainder = 0;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF[9])) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF[10])) {
      return false;
    }

    return true;
  }

  function formatPriceValue(value: number, locale = "pt-BR") {
    if (typeof value === "number") {
      return `R$ ${value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    } else {
      return "R$ 0,00";
    }
  }

  return { formatDayMonthYear, formatCpf, validateCPF, formatPriceValue }
}