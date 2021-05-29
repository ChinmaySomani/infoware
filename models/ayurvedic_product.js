module.exports = function(sequelize, Sequelize) {
 
    var Ayurvedic = sequelize.define('ayurvedic_product', {
 
        ayurvedic_product_id: {
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
 
        ayurvedic_product_info: {
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
        tableName : 'ayurvedic_product',
        timestamps : true
    });
 
    return Ayurvedic;
 
}