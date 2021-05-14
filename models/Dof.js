const User = require("./User");

module.exports = function(sequelize, Sequelize) {
 
    var Dof = sequelize.define('dof', {
 
        dof_id: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },

        name: {
            type: Sequelize.TEXT
        },
        
        mobile: {
            type: Sequelize.BIGINT
        },

        address: {
            type: Sequelize.TEXT
        }, 

        date_of_filling: {
            type: Sequelize.DATE
        },

        userid: {
            // type: Sequelize.INTEGER,
            type: Sequelize.UUID,
            references: {
              model: 'users', // Can be both a string representing the table name or a Sequelize model
              key: 'id'
            }
          }
    }, {
        tableName : 'dateoffilling',
        timestamps : true
    });
 
    return Dof;
 
}
