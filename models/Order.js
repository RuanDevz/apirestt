module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("Order", {
        Product: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Img:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Order;
};
