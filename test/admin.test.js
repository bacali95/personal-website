process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../app");

describe("Admin Page", function () {

    it("renders successfully", function (done) {
        chai.request(server)
            .get("/admin/login")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});
