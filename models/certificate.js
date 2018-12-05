const mongoose = require("mongoose");

const CertificateSchema = mongoose.Schema({
    title:{
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: String
    },
    images: [{
        type: String
    }]
});

const Certificate = module.exports = mongoose.model("Certificate", CertificateSchema);

module.exports.create = function (certificate, callback) {
    certificate.save(callback);
};

module.exports.getAll = function (callback) {
    Certificate.find(callback);
};

module.exports.getById = function (id, callback) {
    Certificate.findById(id, callback);
};

module.exports.update = function (id, certificate, callback) {
    Certificate.findByIdAndUpdate(id, certificate, callback);
};

