module.exports = function(sequelize, Sequelize) {
 
    var Fpdetails = sequelize.define('fpdetails', {
 
        farmerpID: {
            // autoIncrement: true,
            // primaryKey: true,
            // type: Sequelize.INTEGER
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

        village1 : {   //used as state1 (needs correction)
            type: Sequelize.TEXT
        },

        taluka1 : {
            type: Sequelize.TEXT
        },

        district1 : {
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

        aadharno : {
            type : Sequelize.BIGINT
        },

        land_revenue_record_no : {
            type : Sequelize.BIGINT
        },

        village2 : {   //used as state2 (needs correction)
            type: Sequelize.TEXT
        },

        taluka2 : {
            type: Sequelize.TEXT
        },

        district2 : {
            type: Sequelize.TEXT
        },

        survey_number_sub_survey_number  : {
            type : Sequelize.BIGINT
        },

        acre_hectare_goontha  : {
            type : Sequelize.TEXT
        },

        govt_or_non_govt_help : {
            type: Sequelize.TEXT
        },

        help_fo_cultivation_crop : {
            type: Sequelize.TEXT
        },

        help_fo_cultivation_rs : {
            type: Sequelize.TEXT
        },

        help_fo_cultivation_year : {
            type: Sequelize.TEXT
        },

        for_machine_or_machine_material_rs : {
            type: Sequelize.TEXT
        },

        for_machine_or_machine_material_year : {
            type: Sequelize.TEXT
        },

        for_storage_shelter_rs : {
            type: Sequelize.TEXT
        },

        for_storage_shelter_year : {
            type: Sequelize.TEXT
        },

        for_seeds_seedlings_grafting_crop : {
            type: Sequelize.TEXT
        },

        for_seeds_seedlings_grafting_rs : {
            type: Sequelize.TEXT
        },

        for_seeds_seedlings_grafting_year : {
            type: Sequelize.TEXT
        },

        other : {
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
        tableName : 'farmerPDetails',
        timestamps : false
    }); 
    return Fpdetails;
 
}