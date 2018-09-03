import moment from 'moment'
import momentToString from "../../main/js/momentToString";

const NOW = moment("2018-09-03T19:30:19.924Z");



it("formats null as empty string", () => {
    expect(momentToString(null)).toEqual("")
});

it("formats invalid string as empty string", () => {
    expect(momentToString('this_not_a_date')).toEqual("")
});

it("past different year => full date, no hour ", () => {
    expect(momentToString(NOW.clone().subtract(2, "years"), {}, NOW)).toEqual("3 September 2016")
});

it("past same year, more than week => date without year, no hour ", () => {
    expect(momentToString(NOW.clone().subtract(1, "month"), {}, NOW)).toEqual("3 August")
});

it("past same week but more than day => last day, with hour ", () => {
    expect(momentToString(NOW.clone().subtract(2, "days"), {}, NOW)).toEqual("last Saturday, 19:30")
});

it("past yesterday => yesterday, with hour ", () => {
    expect(momentToString(NOW.clone().subtract(1, "days"), {}, NOW)).toEqual("Yesterday, 19:30")
});

it("past today => hour ", () => {
    expect(momentToString(NOW.clone().subtract(1, "hours"), {}, NOW)).toEqual("18:30")
});


it("future different year => full date, no hour ", () => {
    expect(momentToString(NOW.clone().add(2, "years"), {}, NOW)).toEqual("3 September 2020")
});

it("future same year, more than week => date without year, no hour ", () => {
    expect(momentToString(NOW.clone().add(1, "month"), {}, NOW)).toEqual("3 October")
});

it("future same week but more than day => next day, with hour ", () => {
    expect(momentToString(NOW.clone().add(2, "days"), {}, NOW)).toEqual("Wednesday, 19:30")
});

it("future tomorrow => tomorrow,, with hour ", () => {
    expect(momentToString(NOW.clone().add(1, "days"), {}, NOW)).toEqual("Tomorrow, 19:30")
});

it("future today => hour ", () => {
    expect(momentToString(NOW.clone().add(1, "hour"), {}, NOW)).toEqual("20:30")
});

