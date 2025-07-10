import accounting from "accounting";

export const money = {
    format: (value: string | number) => accounting.formatMoney(value, { decimal: ',', precision: 2, thousand: '.', symbol: 'R$ ' })
}