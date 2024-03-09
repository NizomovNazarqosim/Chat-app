import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	
	const token = jwt.sign({ userId }, '1q2w3e4r', {
		expiresIn: "15d",
	});
	console.log('-+++-res', token)

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: false,
	});
};

export default generateTokenAndSetCookie;
