
export function handlePhoneNumberChange(event: any, handleChange: (any)) {
    let formattedNumber = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (formattedNumber.length > 11) {
        return;
    }
    if (formattedNumber.length > 10) {
        formattedNumber = `(${formattedNumber.substring(0, 2)}) ${formattedNumber.substring(2, 3)} ${formattedNumber.substring(3, 7)}-${formattedNumber.substring(7)}`;
    }
    else if (formattedNumber.length > 7) {
        formattedNumber = `(${formattedNumber.substring(0, 2)}) ${formattedNumber.substring(2, 6)}-${formattedNumber.substring(6)}`;
    }
    else if (formattedNumber.length > 2) {
        formattedNumber = `(${formattedNumber.substring(0, 2)}) ${formattedNumber.substring(2)}`;
    }
    event.target.value = formattedNumber;

    handleChange(event);
}
