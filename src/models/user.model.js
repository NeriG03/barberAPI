import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "user";

class User extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: "User",
            timestamps: true
        }
    }
}

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

export { User, UserSchema };