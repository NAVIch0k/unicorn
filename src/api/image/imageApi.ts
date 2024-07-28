import { IImage } from '@/entity/entity'
import { instance } from '..'

export const imageApi = {
    async uploadImage(data: FormData) {
        const res = await instance.post<IImage>('/image', data)
        return res.data
    },
}
