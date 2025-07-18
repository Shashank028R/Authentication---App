import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Users from '../models/Users.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(406).json({ message: 'User already exists', success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'SignUp Successfully.', success: true })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Sever Error.',
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        const errorMessage = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMessage, success: false })
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200).json({ message: 'Login Successfully.', success: true, jwtToken, email, name: user.name })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Sever Error.',
            success: false
        })
    }
}