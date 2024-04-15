import { writeAsyncIterableToWritable } from '@remix-run/node'
import cloudinary, { UploadApiResponse } from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(data: AsyncIterable<Uint8Array>) {
    const uploadPromise = new Promise<UploadApiResponse | undefined>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'stafke_jansen',
            },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(result)
            }
        )
        writeAsyncIterableToWritable(data, uploadStream)
    })

    return uploadPromise
}
