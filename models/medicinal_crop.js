module.exports = function(sequelize, Sequelize) {
 
    var Medicinal_Crop = sequelize.define('medicinal_crop', {
 
        medicinal_crop_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
         
        medicinal_crop_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        
    }, {
        tableName : 'medicinal_crop',
        timestamps : false
    });
 
    return Medicinal_Crop;
 
}