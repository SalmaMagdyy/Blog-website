import userModel from '../../../DB/models/user.model.js';
import postModel from '../../../DB/models/post.model.js';
import commentModel from '../../../DB/models/comment.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    let { userName, email, password, cPassword, age, phone } = req.body;
    if (password == cPassword) {
        const user = await userModel.findOne({ email })
        if (user) {
            res.json({ message: 'Already register' })
        } else {
            const hashed = bcrypt.hashSync(password, 5);
            console.log(hashed);
            const saveUser = await userModel({ userName, email, password: hashed, age, phone });
            const savedUser = await saveUser.save();
            res.json({ message: "saved", savedUser })
        }

    } else {
        res.json({ message: 'cPassword not match with password' })
    }


}

export const signIn = async (req, res) => {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (user) {
        const matched = bcrypt.compareSync(password, user.password);
        if (matched) {
            const token = jwt.sign({ id: user._id }, process.env.tokenKey, { expiresIn: 60 * 60 });
            console.log(token);
            res.json({ message: 'Welcome', token })
        } else {
            res.json({ message: 'Incorrect password' })

        }

    } else {
        res.json({ message: "you have to register first" })
    }
}

export const changePassword = async (req, res) => {
    const { password } = req.body;
    const hashed = await bcrypt.hashSync(password, 5);
    const changePassword = await userModel.findByIdAndUpdate(
        {
            _id: req.currentUserID
        }, {
        password: hashed
    }, { new: true })
    res.json({ message: "updated", changePassword })
}

export const updateAcc = async (req, res) => {
    const { userName } = req.body;
    const updateAcc = await userModel.findByIdAndUpdate(
        {
            _id: req.currentUserID
        }, {
        userName
    }, { new: true })
    res.json({ message: "updated", updateAcc })
}

export const deleteAcc = async (req, res) => {
    const user=await userModel.findByIdAndDelete(req.currentUserID)
    if (user) {
        const deleteposts = await postModel.deleteMany({createdBy:req.currentUserID})
        const deletecomments = await commentModel.deleteMany({createdBy:req.currentUserID})
        res.json({ message: "deleted account", deleteposts,deletecomments });
    } else {
        res.json({ message: "not deleted account " });
    }
}


