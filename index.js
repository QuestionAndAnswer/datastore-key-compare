"use strict";

function pathsEqual(list1, list2) {
    if (list1.length !== list2.length) return false;

    let i = list1.length;
    while (list1[i] === list2[i] && --i > 0);
    return i === 0;
}

/**
 * Compare Datastore Keys 
 * 
 * @param {import("@google-cloud/datastore").Key} k1 
 * @param {import("@google-cloud/datastore").Key} k2
 * 
 * @returns {boolean}
 */
function isDSKeyEqual(k1, k2) {
    return k1 && k2 &&
        k1.namespace === k2.namespace &&
        (k1.id === k2.id || k1.name === k2.name) &&
        pathsEqual(k1.path, k2.path);
}

isDSKeyEqual.default = isDSKeyEqual;
isDSKeyEqual.isDSKeyEqual = isDSKeyEqual;
module.exports = isDSKeyEqual;