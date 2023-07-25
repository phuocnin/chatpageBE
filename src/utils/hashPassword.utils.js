import bcrypt from 'bcrypt'
const saltRounds = 10;
export const hassPassword = async (password) => {
    try {

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
export const comparePassword = async (password, hashedPasswordFromDB) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);
        return isMatch;
    } catch (error) {
        console.error('Error compare password:', error);
        throw error;
    }
}
