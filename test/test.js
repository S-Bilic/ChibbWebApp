var assert = require('assert');
var request = require("request");
// var base_url2 = "http://145.24.222.154/api/humidity"
var base_url = "http://145.24.222.154/api/temperature?limit=5";

describe("GET response from api link /", function() {
    it("returns status code 200", function(done) {
        request.get(base_url, function (error, response) {
            assert.equal(200, response.statusCode);
            done();
        });
    });
});

