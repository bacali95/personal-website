const mongoose = require("mongoose");

const CertificateSchema = mongoose.Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: String
    },
    images: [{
        type: Object
    }]
});

const Certificate = module.exports = mongoose.model("Certificate", CertificateSchema);

module.exports.create = function (certificate) {
    return certificate.save();
};

module.exports.getAll = function () {
    return Certificate.find();
};

module.exports.getById = function (id) {
    return Certificate.findById(id);
};

module.exports.update = function (id, certificate) {
    return Certificate.findByIdAndUpdate(id, certificate);
};

module.exports.remove = function (id) {
    return Certificate.deleteOne({_id: id});
};