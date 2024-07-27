interface CookieOptions {
    path?: string
    expires?: string | Date
    [key: string]: string | number | boolean | undefined | Date
    domain?: string
}

export const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {}
): void => {
    options = {
        path: '/',
        ...options,
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (let optionKey in options) {
        if (options.hasOwnProperty(optionKey)) {
            updatedCookie += '; ' + optionKey
            let optionValue = options[optionKey]
            if (optionValue !== true && optionValue !== undefined) {
                updatedCookie += '=' + optionValue
            }
        }
    }

    document.cookie = updatedCookie
}
