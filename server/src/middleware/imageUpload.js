import { uploads } from "../utils/index.js"

export const uploadFiles = (folderName, fieldName, maxCount) => {
    return (req, res, next) => {
        uploads(folderName).fields([
            {
                name: fieldName,
                maxCount
            }
        ])(req, res, function (err) {
   

            if (err) {
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    return res.status(400).json({
                        success: false,
                        field: fieldName,
                        message: `Maximum ${maxCount} Files Are Allowed`

                    })
                }
                return res.status(400).json({
                    success: false,
                    field: fieldName,
                    message: err.message

                })
            }


            next()
        })
    }
}