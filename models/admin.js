module.exports = function(sequelize, Sequelize) {
 
    var Admin = sequelize.define('admin', {
 
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        
        name: {
            type: Sequelize.TEXT,
        },

        username: {
            type: Sequelize.TEXT,
            allowNull: false
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });
 
    return Admin;
 
}