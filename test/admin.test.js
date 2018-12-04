process.env.NODE_ENV = 'test';

const specs = require("../tools/specs");
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../app');

describe('Admin Page', function () {
    it("renders login page successfully", function (done) {
        chai.request(server)
            .get('/admin/login')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("test login as admin successfully", function (done) {
        chai.request(server)
            .post('/admin/login')
            .field('username', specs.ADMIN_USERNAME)
            .field('password', specs.ADMIN_PASSWORD)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
