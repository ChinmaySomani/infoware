module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        mobile: {
            type: Sequelize.BIGINT,
            allowNull: false
        },

        username: {
            type: Sequelize.TEXT,
            // allowNull: false
        },

        email: {
            type: Sequelize.TEXT,
        },
 
        type : {
            type: Sequelize.TEXT,
            allowNull: false
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE,
        },

        membership_id: {
            type: Sequelize.UUID,
            references: {
              model: 'membership', // Can be both a string representing the table name or a Sequelize model
              key: 'ms_id'
            },
        }
    });
 
    return User;
 
}