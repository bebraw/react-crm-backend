'use strict';


module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
            cost: DataTypes.INTEGER,
        }
    );

    Project.belongsTo(sequelize.models.Client, {
        foreignKey: 'client',
    });

    return Project;
};
