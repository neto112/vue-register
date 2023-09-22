import { format, utcToZonedTime } from "date-fns-tz";

export function formatDayMonthYear(value: string | Date) {
  if (value) {
    const date = new Date(value);
    const zonedDate = utcToZonedTime(date, 'UTC');
    return format(zonedDate, 'dd/MM/yyyy');
  }
  return ""
}

export function formatCpf(value: string) {
  if (value) {
    let formatedValue = "";

    formatedValue = value.padStart(11, "0");
    formatedValue = formatedValue.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    );
    return formatedValue;
  }
  return ""
}

export function formatPriceValue(value: number, locale = "pt-BR") {
  if (typeof value === "number") {
    return `R$ ${value.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  } else {
    return "R$ 0,00";
  }
}