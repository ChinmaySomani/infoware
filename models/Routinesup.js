module.exports = function(sequelize, Sequelize) {
 
    var Routinesup = sequelize.define('routinesup', {
 
        rs_id: {
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

        main_reasons_you_trust_them  : {
            type: Sequelize.JSON,
        },

        who_is_your_current_main_supplier:{
            type: Sequelize.TEXT
        }, 

        name: {
            type: Sequelize.TEXT
        },

        contact_no: {
            type: Sequelize.BIGINT
        }, 
         
        address: {
            type: Sequelize.TEXT
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
        tableName : 'routinesup',
        timestamps : false
    });
 
    return Routinesup;
 
}