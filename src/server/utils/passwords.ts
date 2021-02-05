import * as bcrypt from 'bcrypt'; //can hash and salt password

export async function generateHash(password: string) {
    try {
        const salt = await bcrypt.genSalt(12); //hash- long string of encrypted chars, hash can easily be decoded, when hash it randomly insert word into middle and scramble it to make it nearly impossible to reverse engineer hashed pw
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }

}