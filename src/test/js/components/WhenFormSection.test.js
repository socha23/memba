import WhenFormSection, {parseDateTime} from "../../../main/js/components/WhenFormSection";

it("empty date and time fields when empty string passed as value", () => {
    // given:
    const elem = new WhenFormSection({value: ''});

    // expect:
    expect(elem.state.dateFieldValue).toEqual("");
    expect(elem.state.timeFieldValue).toEqual("")
});

it("empty date and time fields when null passed as value", () => {
    // given:
    const elem = new WhenFormSection({});

    // expect:
    expect(elem.state.dateFieldValue).toEqual("");
    expect(elem.state.timeFieldValue).toEqual("")
});

it("empty date and time fields when something stupid passed as value", () => {
    // given:
    const elem = new WhenFormSection({value: "foobar"});

    // expect:
    expect(elem.state.dateFieldValue).toEqual("");
    expect(elem.state.timeFieldValue).toEqual("")
});

it("sensible date for sensible value", () => {
    // given:
    const elem = new WhenFormSection({value: "2018-08-26T03:10:30Z"});

    // expect:
    expect(elem.state.dateFieldValue).toEqual("2018-08-26");
});

it("sensible time for sensible value", () => {
    // given:
    const elem = new WhenFormSection({value: "2018-08-26T03:10:30Z"});

    // expect:
    expect(elem.state.timeFieldValue).toEqual("03:10");
});

it("parsing date and time", () => {
    const parsed = parseDateTime("2018-08-26", "03:10");
    expect(parsed).not.toBeNull();
    expect(parsed.toISOString()).toEqual("2018-08-26T03:10:00.000Z");
});

it("setting time works with the borked time", () => {
    expect(parseDateTime("2018-08-26", "03").toISOString()).toEqual("2018-08-26T03:00:00.000Z");
    expect(parseDateTime("2018-08-26", "3").toISOString()).toEqual("2018-08-26T03:00:00.000Z");
    expect(parseDateTime("2018-08-26", "315").toISOString()).toEqual("2018-08-26T03:15:00.000Z");
    expect(parseDateTime("2018-08-26", "0315").toISOString()).toEqual("2018-08-26T03:15:00.000Z");
});
