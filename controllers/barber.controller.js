import BarberService from "../services/barber.service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const post = async (req, res) => {
    try {
        const { name, lastname, phone ,email, password, sucursalId} = req.body;

        if (!name || !lastname || !phone || !email || !password || !sucursalId) {
            throw new Error("Name, lastname, phone, email and password fields are required");
        }

        const barberExists = await BarberService.getByEmail(email);

        if (barberExists) {
            throw new Error("Email already exists");
        }

        const passwordHash = bcryptjs.hashSync(password, 15);

        const barber = await BarberService.create({
            name,
            lastname,
            phone,
            email,
            password: passwordHash,
            sucursalId
        });

        const token = jwt.sign({id: barber.id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const lBarber = {
            id: barber.id,
            name: barber.name,
            lastname: barber.lastname,
            phone: barber.phone,
            email: barber.email,
            isAdmin: barber.isAdmin
        }

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000),
            path: "/login"
        });
        res.status(201).json({ok: true, message: "Barber created successfully", token, barber: lBarber});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const get = async (req, res) => {
    try {
        const response = await BarberService.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const getById = async (req, res) => {
    try {
        const response = await BarberService.getById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const put = async (req, res) => {
    try {
        const response = await BarberService.update(req.params.id, req.body);
        res.status(204).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const remove = async (req, res) => {
    try {
        const response = await BarberService.delete(req.params.id);
        res.status(204).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if (!email && !phone) {
            throw new Error("Email or phone number is required");
        }

        const barber = email ? await BarberService.getByEmail(email) : await BarberService.getByPhone(phone);

        if (!barber) {
            throw new Error("Barber not found");
        }

        const passwordMatches = bcryptjs.compareSync(password, barber.password);

        if (!passwordMatches) {
            throw new Error("Password is incorrect");
        }

        const token = jwt.sign({id: barber.id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const lBarber = {
            id: barber.id,
            name: barber.name,
            lastname: barber.lastname,
            phone: barber.phone,
            email: barber.email,
            isAdmin: barber.isAdmin
        }

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000),
            path: "/cita"
        });
        res.status(200).json({ok: true, message: "Login successful", token, barber: lBarber});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export default { post, get, getById, put, remove, login };