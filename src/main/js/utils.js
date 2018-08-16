export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        var v = key instanceof Function ? key(x) : x[key];
        (rv[v] = rv[v] || []).push(x);
        return rv;
    }, {});
};

export const indexById = function (xs) {
    return xs.reduce(function (rv, x) {
        rv[x.id] = x;
        return rv;
    }, {});
};

export const randomFrom = function(items) {
    return items[Math.floor(Math.random() * items.length)]
};