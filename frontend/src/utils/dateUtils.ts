export function parseDateString(dateStr: string): string {
  // Expects dd/MM/yyyy or dd-MM-yyyy, returns yyyy-MM-dd
  if (!dateStr) return "";
  const parts = dateStr.includes("/") ? dateStr.split("/") : dateStr.split("-");
  if (parts.length !== 3) return "";
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function formatDateToDisplay(dateStr: string): string {
  // Expects yyyy-MM-dd, returns dd/MM/yyyy
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}