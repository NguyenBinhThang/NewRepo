const moment = require('moment');

module.exports = {
    multipleConvertDate: function(mongooses) {
        return mongooses.map(mongoose => {
            mongoose.createAt = moment(mongoose.createAt).format('DD-MM-YYYY');
            return mongoose;
        });
    },
    convertDate: function(mongoose) {
        return {
            ...mongoose,
            createAt: moment(mongoose.createAt).format('DD-MM-YYYY')
        };
    }
};