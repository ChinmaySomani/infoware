module.exports = function(sequelize, Sequelize) {
 
    var Useful_part = sequelize.define('useful_part_of_plants', {
 
        useful_part_of_plant_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
         
        english_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        gujrati_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        
    }, {
        tableName : 'useful_part_of_plants',
        timestamps : false
    });
 
    return Useful_part;
 
}