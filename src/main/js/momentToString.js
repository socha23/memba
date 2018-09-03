import moment from 'moment'

const DEFAULT_OPTIONS = {
};

export default function momentToString(v, options = {}, now = moment()) {

    options = {...DEFAULT_OPTIONS, ...options};

    const then = moment(v);
    if (!then.isValid()) {
        return "";
    }



    if (then.isBefore(now)) {

        // PAST

        if (now.clone().subtract(1, "week").startOf("day").isAfter(then)) { // more than a week in past
            if (then.isSame(now, "year")) {
                return then.format("D MMMM")
            } else {
                return then.format("D MMMM YYYY")
            }
        } else {
            if (then.isSame(now, "day")) {
                return then.format("HH:mm")
            } else if (then.isSame(now.clone().subtract(1, "day"), "day")) {
                return "Yesterday, " + then.format("HH:mm")
            } else {
                return "last " + then.format("dddd") + ", " + then.format("HH:mm")
            }
        }

    } else {

        // FUTURE

        if (now.clone().add(1, "week").startOf("day").isBefore(then)) { // more than a week in future
            if (then.isSame(now, "year")) {
                return then.format("D MMMM")
            } else {
                return then.format("D MMMM YYYY")
            }
        } else {
            if (then.isSame(now, "day")) {
                return then.format("HH:mm")
            } else if (then.isSame(now.clone().add(1, "day"), "day")) {
                return "Tomorrow, " + then.format("HH:mm")
            } else {
                return then.format("dddd") + ", " + then.format("HH:mm")
            }
        }
    }


    

    return moment().toISOString()
}

