import todoLogic from './todoLogic'
import {groupBy} from '../utils'

export function groupTreeAsListWithIdent(groups) {
    const result = [];
    const groupsByGroupId = groupBy(groups, g => (g.groupId || todoLogic.ROOT_GROUP_ID));

    function appendChildren(groupId, ident) {
        (groupsByGroupId[groupId] || []).forEach(g => {
            result.push({...g, ident: ident});
            appendChildren(g.id, ident + 1)
        })
    }
    appendChildren(todoLogic.ROOT_GROUP_ID, 0);
    return result;

}
