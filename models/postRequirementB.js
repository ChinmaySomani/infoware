module.exports = function(sequelize, Sequelize) {
 
    var postRequirementBuyer = sequelize.define('postrequirementbuyer', {
 
        post_requirement_id: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },

        name_of_plant: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        expected_price: {
            type: Sequelize.BIGINT,
            allowNull: false
        },

        quantity: {
            type: Sequelize.BIGINT,
            allowNull: false
        },

        certified: {
            type: Sequelize.TEXT,
            defaultValue: "All"
        },

        type_of_plant: {
            type: Sequelize.TEXT,
            allowNull: false
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
        tableName : 'postrequirementbuyer',
        timestamps : false
    });
 
    return postRequirementBuyer;
 
}
