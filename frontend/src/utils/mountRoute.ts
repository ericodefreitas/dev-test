export const mountRoute = (route: string, obj: object) => {
    let replacedPath = route;
    for (const [key, value] of Object.entries(obj)) {
        replacedPath = replacedPath.replace(`:${key}`, value);
    }
    return replacedPath;
}