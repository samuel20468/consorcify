export function areFieldsNotEmpty<T>(obj: T): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (
                obj[key] === null ||
                obj[key] === undefined ||
                obj[key] === ""
            ) {
                return false;
            }
        }
    }
    return true;
}
