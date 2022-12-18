import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.model.js";

export const auth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            var test = authorization.split(" ")[1];
            console.log(authorization.split(" "));
            if (authorization.startsWith("Bearer")) {
                //console.log(test);
                const decoded = jwt.verify(test, process.env.tokenKey)
                console.log(decoded);
                if (decoded) {
                    const user = await userModel.findById(decoded.id);
                    if (user) {
                        req.currentUserID=user._id
                        next();
                    } else {
                        res.json({ message: 'user not found' })

                    }
                } else {
                    res.json({ message: 'invalid token' })

                }
            } else {
                res.json({ message: 'invalid token' })
            }

        } catch (error) {
            res.json({ message: 'error', error })

        }


    }
}

 