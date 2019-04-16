var chai = require("chai");
var Nightmare = require('nightmare');
var express = require('express');

var should = chai.should();

describe("Load A Page", function () {
    this.timeout('5s');

    var app = express();
    var port = 8123;
    var appServer;

    app.use(express.static("../"))

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare()
    });

    beforeEach(function (done) {
        console.log("Starting Server");
        appServer = app.listen(port, done);
    });

    afterEach(function (done) {
        console.log("Stopping Server")
        appServer.close(done);
    });


    describe('/ (Test Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:8123/test.html')
                .end()
                .then(function (result) { done() })
                .catch(done)
        });


        it('should not include Hey you, add some HTML here!', function (done) {
            nightmare
                .goto('http://localhost:8123/test.html')
                .wait('body')
                .evaluate(function () {
                    return document.body.innerHTML;
                })
                .end()
                .then(function (innerHtml) {
                    innerHtml.should.not.include("Hey you, add some HTML here");
                    done();
                })
                .catch(done)
        });
    });
});