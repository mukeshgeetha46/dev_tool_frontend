export function validateForm(validationRules, formValues) {
    let tempErrors = {}
    let status = true;
    validationRules.forEach(function (data, index) {
        const keys = Object.keys(data);
        if (data[keys].required && !formValues[keys]) {
            console.error(`error in ${keys}, ${data[keys].required}`);
            tempErrors[keys] = data[keys].required;
            status = false;
        } else {
            tempErrors[keys] = false;
        }
    })
    return { status, errors: tempErrors };
}