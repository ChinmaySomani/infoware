module.exports = function(sequelize, Sequelize) {
 
    var Buyerdof = sequelize.define('buyerdof', {
 
        bdof_id: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
 
        date_of_filling_this_registration_form: {
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
        tableName : 'buyerdof',
        timestamps : true
    });
 
    return Buyerdof;
 
}