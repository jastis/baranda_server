const bcrypt = require("bcryptjs/dist/bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

//find user by ID
exports.user_get_single = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		if (!user) throw Error("Could not find");

		res.status(200).json(user);
	} catch (err) {
		console.error("Something went wrong");
	}
};

//find  all user
exports.user_get_all = async (req, res) => {
	try {
		const user = await userModel.find();
		if (!user) throw Error("Could not find");

		res.status(200).json(user);
	} catch (err) {
		console.error("Something went wrong");
	}
};

//create new User
exports.user_create_post = async (req, res) => {
	const newUser = new userModel(req.body);
	try {
		const { first_name, last_name, email, password, phone_no } = req.body;
		if (first_name && last_name && email && password && phone_no) {
			const olduser = await userModel.findOne().or([{ email }, { phone_no }]);
			if (olduser) {
				return email == olduser.email
					? res
							.status(409)
							.json({ message: `User with email ${email} already exist!!!` })
					: res.status(409).json({
							message: `User with phone number ${phone_no} already exist!!!`,
					  });
			}
			encPassword = await bcrypt.hash(password, 10);
			newUser.password = encPassword;
			const user = await newUser.save();
			// if (!user) throw Error("Could not save");
			// const jwttoken = jwt.sign({user_id:user._id, email},process.env.TOKEN_KEY,{
			//     expiresIn: "24h",
			// });
			// user.token = jwttoken;
			res.status(200).send(user);
		} else {
			res.status(409).json({ message: "All inputs required!" });
		}
	} catch (err) {
		console.log("Something went wrong");
		console.error(err);
	}
};

exports.user_login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (email && password) {
			const user = await userModel.findOne({ email });
			if (user && (await bcrypt.compare(password, user.password))) {
				if (user.active) {
					const token = jwt.sign(
						{ user_id: user._id, email },
						process.env.TOKEN_KEY,
						{
							expiresIn: "24h",
						}
					);
					user.token = token;
					res.status(200).json(user);
				} else {
					return res
						.status(403)
						.json({ message: "User account not activated" });
				}
			} else {
				return res.status(403).json({ message: "User or password incorrect" });
			}
		} else {
			return res.status(403).json({ message: "All inputs required." });
		}
	} catch (err) {
		console.error(err);
	}
};

//Update user by ID
exports.user_update_single = async (req, res) => {
	try {
		const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
		if (!user) throw Error("Could not find");

		res.status(200).json(req.body);
	} catch (err) {
		console.error("Something went wrong");
	}
};
