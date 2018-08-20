/**
 * @param items to sort
 * @param order array with item IDs. Not all items from 'items' need to be represented here;
 * also, can contain some additional values.
 */
export function sort(items, order) {
    if (!order) {
        order = [];
    }
    const result = [...items];
    result.sort((a, b) => {
        const aPos = order.indexOf(a.id);
        const bPos = order.indexOf(b.id);

        if (aPos === -1 && bPos === -1) {
            if (a.id > b.id) {
                return -1;
            } else if (a.id === b.id) {
                return 0;
            } else {
                return 1;
            }
        } else if (aPos === -1) {
            return -1;
        } else if (bPos === -1) {
            return 1;
        } else {
            return aPos - bPos;
        }
    });
    return result;
}