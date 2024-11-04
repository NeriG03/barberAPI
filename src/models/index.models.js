import { Sequelize } from "sequelize"
import config from '../config/config.js'
import { Barber, BarberSchema } from "./barber.model.js"
import { Sucursal, SucursalSchema } from "./sucursal.model.js"

function setUpModels(sequelize){
    Barber.init(BarberSchema, Barber.config(sequelize))
    Sucursal.init(SucursalSchema, Sucursal.config(sequelize))



    // Add the associations here
    Sucursal.hasMany(Barber, {foreignKey: 'sucursalId'});
    Barber.belongsTo(Sucursal, {foreignKey: 'sucursalId'});
}

const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser, 
    config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres'
})

sequelize.sync()
setUpModels(sequelize)

export {
    setUpModels,
    Barber,
    Sucursal
}
