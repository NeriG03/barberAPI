import { Sequelize } from "sequelize"
import config from '../config/config.js'

function setUpModels(sequelize){

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
    setUpModels
}
