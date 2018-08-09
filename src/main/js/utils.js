export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        var v = key instanceof Function ? key(x) : x[key];
        (rv[v] = rv[v] || []).push(x);
        return rv;
    }, {});
};