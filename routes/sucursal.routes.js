import express from "express";

import sucursalController from "../controllers/sucursal.controller.js";

const router = express.Router();

router
    .get("/sucursal", sucursalController.get)
    .get("/sucursal/:id", sucursalController.getById)
    .post("/sucursal", sucursalController.post)
    .put("/sucursal/:id", sucursalController.put)
    .delete("/sucursal/:id", sucursalController.remove);

export default router;

