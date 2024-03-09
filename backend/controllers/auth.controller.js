import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);



		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: 'https://picsum.photos/200'
		});
		
		if (newUser) {
			await newUser.save();

			let iD = String(newUser._id);
			const token = jwt.sign({ iD }, '1q2w3e4r', {
				expiresIn: "15d",
			});

			res
		       .cookie("jwt", token, {
		       	maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		       	httpOnly: true, 
		       	sameSite: "strict",
		       	secure: false,
		       })
		       .status(200).json({
		       	token:token,
		       	_id: newUser._id,
		       	fullName: newUser.fullName,
		       	username: newUser.username,
		       	profilePic: newUser.profilePic,
		       });
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const iD = user._id

		const token = jwt.sign({ iD }, '1q2w3e4r', {
			expiresIn: "15d",
		});

		res
		.cookie("jwt", token, {
			maxAge: 15 * 24 * 60 * 60 * 1000, // MS
			httpOnly: true, 
			sameSite: "strict", 
			secure: false,
		})
		.status(200).json({
			token:token,
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
