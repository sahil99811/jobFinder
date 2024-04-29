const User = require("../models/User");
const ForgotPassword=require('../models/ForgotPassword')
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");
        await ForgotPassword.create(
			{
                email,
                token
            }
		);
		const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.status(201).json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `try again later something went wrong`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.status(401).json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await ForgotPassword.findOne({ token: token });
		if (!userDetails) {
			return res.status(403).json({
				success: false,
				message: "Invalid link or link has been expired",
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ email: userDetails?.email },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.status(201).json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};