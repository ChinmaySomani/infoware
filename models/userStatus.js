module.exports = function(sequelize, Sequelize) {
 
    var user_status = sequelize.define('userStatus', {
 
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        
        userid: {
            type: Sequelize.UUID,
            references: {
              model: 'users', // Can be both a string representing the table name or a Sequelize model
              key: 'id'
            }
        },

        // Active or Inactive or Remove
        status : {
            type: Sequelize.TEXT,
            defaultValue: "Active",
        },
 
    },{
        tableName : 'userStatus',
        timestamps : true
    });
 
    return user_status;
 
}