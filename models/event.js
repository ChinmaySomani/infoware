module.exports = function(sequelize, Sequelize) {
 
    var Event = sequelize.define('events', {
 
        event_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        
        // Webinar or Farmer
        event_type: {
            type: Sequelize.TEXT,
        },

        event_name: {
            type: Sequelize.TEXT,
        },

        status: {
            type: Sequelize.TEXT,
        },

        total_users_registered: {
            type: Sequelize.INTEGER,
        },

        start_date: {
            type: Sequelize.DATE,
        },

        end_date: {
            type: Sequelize.DATE,
        },

        models_used: {
            type: Sequelize.JSON
        }

    });
 
    return Event;
 
}