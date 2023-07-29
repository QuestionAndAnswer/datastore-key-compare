var assert = require("chai").assert;
var { Datastore } = require("@google-cloud/datastore");
var isDSKeyEqual = require("./index");

const db = new Datastore();

it("different length path not equal", function () {
    const k1 = db.key(["Kind", "2", "Kind2", "2"]);
    const k2 = db.key(["Kind", "2"]);

    assert.notOk(isDSKeyEqual(k1, k2));
});

describe("no namespace", function () {
    it("id vs id equal", function () {
        const k1 = db.key(["Kind", db.int(1)]);
        const k2 = db.key(["Kind", db.int(1)]);

        assert.ok(isDSKeyEqual(k1, k2));
    });

    it("name vs name equal", function () {
        const k1 = db.key(["Kind", "2"]);
        const k2 = db.key(["Kind", "2"]);

        assert.ok(isDSKeyEqual(k1, k2));
    });

    it("name vs id not equal", function () {
        const k1 = db.key(["Kind", db.int(2)]);
        const k2 = db.key(["Kind", "2"]);

        assert.notOk(isDSKeyEqual(k1, k2));
    });
});

describe("with namespace", function () {
    it("id vs id equal", function () {
        const k1 = db.key({ namespace: "123", path: ["Kind", db.int(1)] });
        const k2 = db.key({ namespace: "123", path: ["Kind", db.int(1)] });

        assert.ok(isDSKeyEqual(k1, k2));
    });

    it("name vs name equal", function () {
        const k1 = db.key({ namespace: "123", path: ["Kind", "2"] });
        const k2 = db.key({ namespace: "123", path: ["Kind", "2"] });

        assert.ok(isDSKeyEqual(k1, k2));
    });

    it("name vs id not equal", function () {
        const k1 = db.key({ namespace: "123", path: ["Kind", db.int(2)] });
        const k2 = db.key({ namespace: "123", path: ["Kind", "2"] });

        assert.notOk(isDSKeyEqual(k1, k2));
    });
});

describe("inner keys", function () {
    it("id vs id equal", function () {
        const k1 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", db.int("2")] });
        const k2 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", db.int("2")] });

        assert.ok(isDSKeyEqual(k1, k2));
    });

    it("name vs name equal", function () {
        const k1 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", "2"] });
        const k2 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", "2"] });

        assert.ok(isDSKeyEqual(k1, k2));
    });

    it("name vs id not equal", function () {
        const k1 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", "2"] });
        const k2 = db.key({ namespace: "123", path: ["Kind", db.int(1), "Inner", db.int(2)] });

        assert.notOk(isDSKeyEqual(k1, k2));
    });
});
