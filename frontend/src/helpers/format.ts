import accounting from "accounting";

const intl = new Intl.NumberFormat();

export const format = {
    toCurrency: (value: number) => accounting.formatMoney(value, 'R$ ', 2, '.', ','),
    currencyToNumber: (value: string) => {
        const cleanedCurrency = value.replace(/[R$\s]/g, '');
        const withoutThousandSeparator = cleanedCurrency.replace(/\./g, '');
        const normalizedCurrency = withoutThousandSeparator.replace(',', '.');
        const result = parseFloat(normalizedCurrency);

        if (isNaN(result)) {
            throw new Error('Formato inválido para moeda');
        }

        return result;
    },
    toCNPJ: (value: string) => value && value.length === 14 ? value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5') : value,
    toMask: (value: string, mask: string) => {
        let result = '';
        let inputIndex = 0;

        value = value.replace(/\D/g, '');
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] === '#') {
                if (inputIndex < value.length) {
                    result += value[inputIndex];
                    inputIndex++;
                } else {
                    break;
                }
            } else {
                result += mask[i];
            }
        }

        return result;
    },
    unmask: (value: string) => value.replace(/\D/g, '')
}