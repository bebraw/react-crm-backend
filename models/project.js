'use strict';


module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
            cost: DataTypes.INTEGER,
        },
        {
            classMethods: {
                associate: function(models) {
                    Project.belongsTo(models.Client, {
                        constraints: false,
                        foreignKey: 'client',
                    });
                }
            }
        }
    );

    return Project;
};
