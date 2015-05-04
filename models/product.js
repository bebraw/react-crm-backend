'use strict';

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define('Product', {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            purchasePrice: DataTypes.DECIMAL,
            sellingPrice: DataTypes.DECIMAL,
            priceChanged: DataTypes.DATE,
            vat: DataTypes.DECIMAL,
            group: DataTypes.INTEGER,
            inStock: DataTypes.BOOLEAN
        },
        {
            classMethods: {
                associate: function(models) {
                    Product.belongsTo(models.ProductGroup, {
                        foreignKey: 'productgroup',
                    });
                }
            }
        }
    );

    return Product;
};
