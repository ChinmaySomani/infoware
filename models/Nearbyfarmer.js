module.exports = function(sequelize, Sequelize) {
 
    var Nearbyfarmer = sequelize.define('nearbyfarmer', {
 
        nf_id: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },

        yes_or_no:{
            type: Sequelize.TEXT
        },
 
        name: {
            type: Sequelize.TEXT
        },
         
        address: {
            type: Sequelize.TEXT
        }, 

        pin_code_number : {
            type: Sequelize.BIGINT
        },

        mobile: {
            type: Sequelize.BIGINT
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
        tableName : 'nearbyFarmer',
        timestamps : true
    });
 
    return Nearbyfarmer;
 
}