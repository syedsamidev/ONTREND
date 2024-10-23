import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (token) {
        try {
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = tokenDecode.id;
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }
    }
    next();
}

export default authUser;
