module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return User;
};
