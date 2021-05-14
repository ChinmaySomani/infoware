module.exports = function(sequelize, Sequelize) {
 
    var buyerWebinarForm = sequelize.define('buyer_webinar_form', {
 
        buyerWebinarFormID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
 
        name: {
            type: Sequelize.TEXT,
        },
 
        surname : {
            type: Sequelize.TEXT
        },

        father_or_husband_name : {
            type: Sequelize.TEXT
        },

        address : {
            type: Sequelize.TEXT
        },

        village_name: { 
            type: Sequelize.TEXT
        },

        state : {   //used as state1 (needs correction)
            type: Sequelize.TEXT
        },

        taluka : {
            type: Sequelize.TEXT
        },

        district : {
            type: Sequelize.TEXT
        },

        area : {
            type: Sequelize.TEXT
        },

        pin_code : {
            type: Sequelize.BIGINT
        },

        phone : {
            type: Sequelize.BIGINT
        },

        mobile : {
            type : Sequelize.BIGINT,
        },

        whatsApp: {
            type : Sequelize.BIGINT
        },

        telegram : {
            type : Sequelize.BIGINT
        },

        email_id : {
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
        tableName : 'buyer_webinar_form',
        timestamps : true
    }); 
    return buyerWebinarForm;
 
}