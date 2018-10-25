import moment from 'moment'
import momentToString from "../../main/js/momentToString";

const NOW = moment("2018-09-03T19:30:19.924Z");



it("formats null as empty string", () => {
    expect(momentToString(null)).toEqual("")
});

it("formats invalid string as empty string", () => {
    expect(momentToString('this_not_a_date')).toEqual("")
});

it("past different year => full date, with hour ", () => {
    expect(momentToString(NOW.clone().subtract(2, "years"), {}, NOW)).toEqual("3 September 2016, 19:30")
});

it("past same year, more than week => date without year, with hour ", () => {
    expect(momentToString(NOW.clone().subtract(1, "month"), {}, NOW)).toEqual("3 August, 19:30")
});

it("past same week but more than day => last day, with hour ", () => {
    expect(momentToString(NOW.clone().subtract(2, "days"), {}, NOW)).toEqual("last Saturday, 19:30")
});

it("past yesterday => yesterday, with hour ", () => {
    expect(momentToString(NOW.clone().subtract(1, "days"), {}, NOW)).toEqual("Yesterday, 19:30")
});

it("past today => today with hour ", () => {
    expect(momentToString(NOW.clone().subtract(1, "hours"), {}, NOW)).toEqual("Today, 18:30")
});


it("future different year => full date, with hour ", () => {
    expect(momentToString(NOW.clone().add(2, "years"), {}, NOW)).toEqual("3 September 2020, 19:30")
});

it("future same year, more than week => date without year, with hour ", () => {
    expect(momentToString(NOW.clone().add(1, "month"), {}, NOW)).toEqual("3 October, 19:30")
});

it("future same week but more than day => next day, with hour ", () => {
    expect(momentToString(NOW.clone().add(2, "days"), {}, NOW)).toEqual("Wednesday, 19:30")
});

it("future tomorrow => tomorrow,, with hour ", () => {
    expect(momentToString(NOW.clone().add(1, "days"), {}, NOW)).toEqual("Tomorrow, 19:30")
});

it("future today => today with hour ", () => {
    expect(momentToString(NOW.clone().add(4, "hour"), {}, NOW)).toEqual("Today, 23:30")
});

it("future today in closest 3h => today with minutes and hours too ", () => {
    expect(momentToString(NOW.clone().add(75, "minutes"), {}, NOW)).toEqual("Today, 20:45 (in 1h 15m)")
});

it("future today in closest 3h => no zero hours ", () => {
    expect(momentToString(NOW.clone().add(15, "minutes"), {}, NOW)).toEqual("Today, 19:45 (in 15m)")
});
