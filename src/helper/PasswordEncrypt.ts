import * as crypto from 'crypto';
export const PasswordEncrypt = (password: string): string => {
    const sha256 = crypto.createHash('sha256');
    // Update the hash object with the password
    sha256.update(password);
    // Generate the hashed password
    return sha256.digest('hex');
}