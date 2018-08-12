import {groupTreeAsListWithIdent} from "../../main/js/logic/groupTree";
import todoLogic from "../../main/js/logic/todoLogic";

it("returns empty list for empty", () => {
    expect(groupTreeAsListWithIdent([])).toEqual([])
});

it("simple case with all top level", () => {
    const groups = [
        {id: "g1", groupId: todoLogic.ROOT_GROUP_ID},
        {id: "g2", groupId: todoLogic.ROOT_GROUP_ID},
        {id: "g3", groupId: todoLogic.ROOT_GROUP_ID},
    ]

    const result = groupTreeAsListWithIdent(groups);

    expect(result.map(g => g.id)).toEqual(["g1", "g2", "g3"]);
    expect(result.map(g => g.ident)).toEqual([0, 0, 0]);
});

it("mixed up case with all top level", () => {
    const groups = [
        {id: "g1", groupId: todoLogic.ROOT_GROUP_ID},
        {id: "g2a", groupId: "g2"},
        {id: "g2aa", groupId: "g2a"},
        {id: "g3a", groupId: "g3"},
        {id: "g2", groupId: todoLogic.ROOT_GROUP_ID},
        {id: "g3", groupId: todoLogic.ROOT_GROUP_ID},
        {id: "g2b", groupId: "g2"},
        {id: "g2ab", groupId: "g2a"},
    ];

    const result = groupTreeAsListWithIdent(groups);

    /* should look like this:
     * g1
     * g2
     *   g2a
     *     g2aa
     *     g2ab
     *   g2b
     * g3
     *   g3a
     */
    expect(result.map(g => g.id)).toEqual(["g1", "g2", "g2a", "g2aa", "g2ab", "g2b", "g3", "g3a"]);
    expect(result.map(g => g.ident)).toEqual([0, 0, 1, 2, 2, 1, 0, 1]);
});
