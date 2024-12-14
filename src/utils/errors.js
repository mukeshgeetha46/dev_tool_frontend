export function errorsObjectToText(errors,keyrequired=false){
    let error = '';
    for (const key in errors) {
        error += `${keyrequired?key+" - ":""} ${errors[key]}`;
    }
    return error.trim();
}
export function errorParser(e){
    return errorsObjectToText(e.error.errors) || e.error || "Failed to load data 🤯";
}