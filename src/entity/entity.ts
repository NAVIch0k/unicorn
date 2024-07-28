export interface IUser {
    name: string
    email: string
    slug: string
    description: string
    image: {
        id: string
        url: string
        width: string
        height: string
    }
    cover: {
        id: string
        url: string
        width: string
        height: string
    }
}

export interface IImage {
    id: string
    url: string
    width: string
    height: string
}
