# Summary 
Compare keys from Google's Cloud Datastore.

# Installation

```
npm install --save datastore-key-compare
```

# Usage

```javascript
var compareKeys = require("datastore-key-compare");

var k1 = db.key(["Kind", db.int(1)]);
var k2 = db.key(["Kind", db.int(1)]);

compareKeys(k1, k2);
```