'use strict';


module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
            cost: DataTypes.INTEGER,
        },
        {
            classMethods: {
                associate: function(models) {
                    Project.belongsTo(models.Client, {
                        foreignKey: 'client',
                    });
                }
            }
        }
    );

    return Project;
};
