// This handles the logic: finding the user, checking the password, and sending back the data.
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 2. Compare password (using the bcrypt logic in your model)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 3. Generate a JWT Token (Optional but recommended for security)
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            "your_jwt_secret_key", // In production, use process.env.JWT_SECRET
            { expiresIn: '1d' }
        );

        // 4. Send Response
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
