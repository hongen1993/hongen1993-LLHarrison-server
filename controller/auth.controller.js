const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const SignUpController = (req, res, next) => {
    const { email, password, name, surname, birthdate, phoneNumber } = req.body;

    if (email === "" || password === "" || name === "" || surname === "" || phoneNumber === "") {
        res.status(400).json({ message: "Fill all fields in order to sign up" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
    }
    UserModel.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return UserModel.create({ email, password: hashedPassword, name, surname, birthdate, phoneNumber, role });
        })
        .then((createdUser) => {
            const { email, name, surname, birthdate, phoneNumber, _id, role } = createdUser;

            const user = { email, name, surname, birthdate, phoneNumber, _id, role };

            res.status(201).json({ user: user });
        })
        .catch((err) => next(err));
}

const LoginController = (req, res, next) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    UserModel.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "User not found." });
                return;
            }

            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {
                const { _id, email, name, surname, birthdate, phoneNumber, role } = foundUser;

                const payload = { _id, email, name, surname, birthdate, phoneNumber, role };

                const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "7d",
                });

                res.status(200).json({ authToken: authToken });
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch((err) => next(err));
}

module.exports = {
    SignUpController,
    LoginController
}