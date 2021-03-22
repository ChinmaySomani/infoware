module.exports = function(sequelize, Sequelize) {
 
    var Lab = sequelize.define('lab', {
 
        lab_id: {
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

        in_house_laboratory_testing:{
            type: Sequelize.TEXT
        },

        outside_laboratory_testing:{
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
        tableName : 'lab',
        timestamps : false
    });
 
    return Lab;
 
}