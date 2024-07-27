export const getCookie = (key: string): any => {
    return document.cookie
        .split(';')
        .find((c) => c.split('=')[0].trim() === key)
        ?.split('=')[1]
}
