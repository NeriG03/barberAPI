import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    const token = req.headers.cookie.split('=')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
}