import { Sequelize } from "sequelize"
import config from '../config/config.js'
import { Barber, BarberSchema } from "./barber.model.js"

function setUpModels(sequelize){
    Barber.init(BarberSchema, Barber.config(sequelize))

}

const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser, 
    config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres'
})

sequelize.sync({force: true})
.then(() => {
    console.log('Tablas sincronizadas')
})
.catch((error) => {
    console.log('Error al sincronizar tablas', error)
})

setUpModels(sequelize)

export {
    setUpModels,
    Barber
}
