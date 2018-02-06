function isEqual(list1, list2) {
    var maxLength = Math.max(list1.length, list2.length);
    var i = 0;
    while(list1[i] === list2[i] && ++i < maxLength);
    return i === maxLength;
}

/**
 * @typedef DatastoreKey
 * @type {Object}
 * @property {number} [id]
 * @property {string} [name]
 * @property {string} [namespace]
 * @property {string[]} path
 * @property {DatastoreKey} [parent]
 */

/**
 * @summary Compare Datastore Keys 
 * @param {DatastoreKey} key1 
 * @param {DatastoreKey} key2 
 * @return {boolean} true if euqal, false otherwise
 */
function compareKeys (key1, key2) {
    return key1 && key2 && 
        key1.namespace === key2.namespace && 
        (key1.id === key2.id || key1.name === key2.name) && 
        isEqual(key1.path, key2.path);
}

module.exports = compareKeys;