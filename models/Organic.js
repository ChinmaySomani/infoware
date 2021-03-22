module.exports = function(sequelize, Sequelize) {
 
    var Organic = sequelize.define('organic', {
 
        organic_id: {
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
 
        name_of_organic_farm_certifying_agency: {
            type: Sequelize.TEXT
        },
        
        date_and_year_of_registration: {
            type: Sequelize.DATE
        },
        
        registration_no: {
            type: Sequelize.BIGINT
        },
        
        have_you_done_any_lab_test: {
            type: Sequelize.TEXT //yes or no
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
        tableName : 'organic',
        timestamps : false
    });
 
    return Organic;
 
}
