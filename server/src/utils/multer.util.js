import multer from "multer"
import path from "path"

export const uploads = (folderName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },

        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })

    const fileFilter = (req, file, cb) => {

        try {

            const allowedExt = [".jpg", ".jpeg", ".png"]
            const allowedMime = ["image/jpeg", "image/png"]

            const ext = path.extname(file.originalname).toLowerCase()

            if (allowedExt.includes(ext) && allowedMime.includes(file.mimetype)
            ) {
                cb(null, true)
            } else {
                cb(new Error("Only .jpg, .jpeg and .png files are allowed"))
            }

        } catch (error) {
            cb(error.message)
        }
    }

    return multer({
        storage,
        fileFilter
    })
}