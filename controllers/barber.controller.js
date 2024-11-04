import BarberService from "../services/barber.service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const post = async (req, res) => {
    try {
        const { name, lastname, phone ,email, password } = req.body;
        
        if (!name || !lastname || !phone || !email || !password) {
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
            password: passwordHash
        });

        const token = jwt.sign({id: barber.id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });


        res.status(201).json({ok: true, message: "Barber created successfully"});
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
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password fields are required");
        }

        const barber = await BarberService.getByEmail(email);

        if (!barber) {
            throw new Error("Email not found");
        }

        const passwordMatches = bcryptjs.compareSync(password, barber.password);

        if (!passwordMatches) {
            throw new Error("Password is incorrect");
        }

        const token = jwt.sign({id: barber.id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({ok: true, message: "Login successful"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export default { post, get, getById, put, remove, login };