const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        fname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            beforeBulkCreate: async (newUserData) => {
                for (let i = 0; i < newUserData.length; i++) {
                    newUserData[i].password = await bcrypt.hash(newUserData[i].password, 10);
                    newUserData[i].email = await newUserData[i].email.toLowerCase();
                }
                return newUserData;
            },
            beforeCreate: async (UserData) => {
                UserData.password = await bcrypt.hash(UserData.password, 10);
                UserData.email = await UserData.email.toLowerCase();
                return UserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                updatedUserData.email = await updatedUserData.email.toLowerCase();
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;