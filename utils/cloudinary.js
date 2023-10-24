const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const cloudinaryUploadImg = async(fileToUpload) => {
    return new Promise((resolve) => {
        cloudinary.updloader.upload(fileToUpload, (result) => {
            resolve(
                {url: result.secure_url},
                {resource_type: "auto"}
            )
        })
    })
}

module.exports = cloudinaryUploadImg