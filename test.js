var assert = require("chai").assert;
var db = require("@google-cloud/datastore")();
var compareKeys = require("./index");

describe("datastore-key-compare", function () {
    describe("no namespace", function () {
        it("id vs id", function () {
            var k1 = db.key(["Kind", db.int(1)]);
            var k2 = db.key(["Kind", db.int(1)]);

            assert.ok(compareKeys(k1, k2));
        });

        it("name vs name", function () {
            var k1 = db.key(["Kind", "2"]);
            var k2 = db.key(["Kind", "2"]);

            assert.ok(compareKeys(k1, k2));
        });

        it("name vs id not equal", function () {
            var k1 = db.key(["Kind", db.int(2)]);
            var k2 = db.key(["Kind", "2"]);

            assert.notOk(compareKeys(k1, k2));
        });
    });

    describe("with namespace", function () {
        it("id vs id", function () {
            var k1 = db.key({ namespace: "123", path: ["Kind", db.int(1)]});
            var k2 = db.key({ namespace: "123", path: ["Kind", db.int(1)]});

            assert.ok(compareKeys(k1, k2));
        });

        it("name vs name", function () {
            var k1 = db.key({ namespace: "123", path: ["Kind", "2"]});
            var k2 = db.key({ namespace: "123", path: ["Kind", "2"]});

            assert.ok(compareKeys(k1, k2));
        });

        it("name vs id not equal", function () {
            var k1 = db.key({ namespace: "123", path: ["Kind", db.int(2)]});
            var k2 = db.key({ namespace: "123", path: ["Kind", "2"]});

            assert.notOk(compareKeys(k1, k2));
        });
    });

    describe("inner keys", function () {
        it("id vs id", function () {
            var k1 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", db.int("2")]});
            var k2 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", db.int("2")]});

            assert.ok(compareKeys(k1, k2));
        });

        it("name vs name", function () {
            var k1 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", "2"]});
            var k2 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", "2"]});

            assert.ok(compareKeys(k1, k2));
        });

        it("name vs id not equal", function () {
            var k1 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", "2"]});
            var k2 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", db.int(2)]});

            assert.notOk(compareKeys(k1, k2));
        });
    });
});