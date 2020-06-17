const jwt = require ('jsonwebtoken');

const verifyAuthToken = async (token) => {
    try {
        if (!process.env.AUTH_TOKEN_PRIVATE_KEY) {
            throw new Error();
        }

        if (!token) {
            throw new Error();
        }

        if (!token) {
            throw new Error();
        }

        const decoded = await jwt.verify(token, process.env.AUTH_TOKEN_PRIVATE_KEY);

        if (!decoded) {
            throw new Error();
        }

        return decoded;
    } catch {
        return null;
    }
}

module.exports = verifyAuthToken;