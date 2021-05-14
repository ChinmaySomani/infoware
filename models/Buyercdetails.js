module.exports = function(sequelize, Sequelize) {
 
    var Buyercdetails = sequelize.define('buyercdetails', {
 
        buyercID: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
 
        name_of_the_company_organization: {
            type: Sequelize.TEXT
        },

        type_of_organization:{
            type: Sequelize.TEXT
        },
 
        name_of_the_head_of_the_company : {
            type: Sequelize.TEXT
        },

        specify_organization:{
            type: Sequelize.TEXT
        },

        address : {
            type: Sequelize.TEXT
        },

        phone : {
            type : Sequelize.BIGINT
        },

        mobile : {
            type : Sequelize.BIGINT
        },

        whatsapp : {
            type : Sequelize.BIGINT
        },

        telegram : {
            type : Sequelize.BIGINT
        },

        email_id:{
            type: Sequelize.TEXT
        },

        gstin_no : {
            type : Sequelize.BIGINT
        },

        cin_no : {
            type : Sequelize.BIGINT
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
        tableName : 'buyerCDetails',
        timestamps : true
    }); 
    return Buyercdetails;
 
} 