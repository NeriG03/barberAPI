import userService from "../services/user.service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const post = async (req, res) => {
    try {
        const { name, phone ,email, password } = req.body;
        
        if (!name || !phone || !email || !password) {
            throw new Error("Name, phone, email and password fields are required");
        }

        const userExists = await userService.getByEmail(email);

        if (userExists) {
            throw new Error("Email already exists");
        }

        const passwordHash = bcryptjs.hashSync(password, 15);

        const user = await userService.create({
            name,
            phone,
            email,
            password: passwordHash
        });

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const lUser = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email
        }

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000),
            path: "/login"
        });


        res.status(201).json({ok: true, message: "User created successfully", token, user: lUser});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const put = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const remove = async (req, res) => {
    try {
        await userService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if (!email && !phone) {
            throw new Error("Email or phone number is required");
        }

        const user = email ? await userService.getByEmail(email) : await userService.getByPhone(phone);

        if (!user) {
            throw new Error("User not found");
        }

        const passwordIsValid = bcryptjs.compareSync(password, user.password);

        if (!passwordIsValid) {
            throw new Error("Invalid password");
        }

        const lUser = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({auth: true, message: "User authenticated", token, user: lUser});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default { post, get, getById, put, remove, login };