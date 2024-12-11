import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "cita";

class Cita extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: 'Cita',
            timestamps: true
        }
    }
}

const CitaSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    servicio: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

export { Cita, CitaSchema };