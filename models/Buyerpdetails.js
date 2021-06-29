module.exports = function(sequelize, Sequelize) {
 
    var Buyerpdetails = sequelize.define('buyerpdetails', {
 
        buyerpID: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
 
        name: {
            type: Sequelize.TEXT
        },
 
        surname : {
            type: Sequelize.TEXT
        },

        basic_qualification:{
            type: Sequelize.TEXT
        },

        father_or_husband_name:{
            type: Sequelize.TEXT
        },

        address_society_street_house_number:{
            type: Sequelize.TEXT
        },

        state:{
            type: Sequelize.TEXT
        },

        district:{
            type: Sequelize.TEXT
        },

        taluka:{
            type: Sequelize.TEXT
        },

        village:{
            type: Sequelize.TEXT
        },

        pin:{
            type : Sequelize.BIGINT
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

        aadhar_no : {
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
        tableName : 'buyerPDetails',
        timestamps : true
    }); 
    return Buyerpdetails;
 
}