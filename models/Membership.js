module.exports = function(sequelize, Sequelize) {
 
    var Membership = sequelize.define('membership', {
 
        ms_id: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
         
        type: {
            type: Sequelize.TEXT
        },
         
        duration: {
            type: Sequelize.TEXT
        },
        
        amount: {
            type: Sequelize.INTEGER
        },

        // userid: {
        //     // type: Sequelize.INTEGER,
        //     type: Sequelize.UUID,
        //     references: {
        //       model: 'users', // Can be both a string representing the table name or a Sequelize model
        //       key: 'id'
        //     }
        //   }
    }, {
        tableName : 'membership',
        timestamps : false
    });
 
    return Membership;
 
}