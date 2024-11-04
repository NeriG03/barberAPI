import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "sucursal";

class Sucursal extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: "Sucursal",
            timestamps: true
        }
    }
}

const SucursalSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}

export { Sucursal, SucursalSchema };