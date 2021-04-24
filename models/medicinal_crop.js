module.exports = function(sequelize, Sequelize) {
 
    var Medicinal_Crop = sequelize.define('medicinal_crop', {
 
        medicinal_crop_id: {
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
        tableName : 'medicinal_crop',
        timestamps : false
    });
 
    return Medicinal_Crop;
 
}