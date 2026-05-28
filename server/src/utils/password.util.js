import bcrypt from "bcrypt"

export const hashedPassword = async (password, salt = 10) => {
    return await bcrypt.hash(password, salt)
}

export const checkPassword = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword)
}