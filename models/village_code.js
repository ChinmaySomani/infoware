module.exports = function(sequelize, Sequelize) {
 
    var villageCode = sequelize.define('village_code', {
 
        village_code_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        village_code: {
            type: Sequelize.BIGINT,
            allowNull: false
        },

        villageId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'village', // Can be both a string representing the table name or a Sequelize model
              key: 'village_id'
            }
        },

        talukaId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'taluka', // Can be both a string representing the table name or a Sequelize model
              key: 'taluka_id'
            }
        },

        districtId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'district', // Can be both a string representing the table name or a Sequelize model
              key: 'district_id'
            }
        },

        stateId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'state', // Can be both a string representing the table name or a Sequelize model
              key: 'state_id'
            }
        },
        
        countryId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'country', // Can be both a string representing the table name or a Sequelize model
              key: 'country_id'
            }
        }
 
    }, {
        tableName : 'village_code',
        timestamps : false
    });
 
    return villageCode;
 
}