import jwt from "jsonwebtoken"

const adminAuth = async (req,res,next)=> {
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success: false, message: "Not Authorized - Login again"});
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.email !== process.env.ADMIN_EMAIL){
            return res.status(403).json({ success: false, message: "Not Authorized - Invalid token" });
        }
        next();
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export default adminAuth;