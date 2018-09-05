import moment from 'moment'

const DEFAULT_OPTIONS = {
};

export default function momentToString(v, options = {}, now = moment()) {

    options = {...DEFAULT_OPTIONS, ...options};

    const then = moment(v).startOf("minute");
    now = now.startOf("minute");
    
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
                return "Today, " + then.format("HH:mm")
            } else if (then.isSame(now.clone().subtract(1, "day"), "day")) {
                return "Yesterday, " + then.format("HH:mm")
            } else {
                return "last " + then.format("dddd") + ", " + then.format("HH:mm")
            }
        }

    } else {

        // FUTURE

        if (now.clone().add(6, "days").startOf("day").isBefore(then)) { // more than a week in future
            if (then.isSame(now, "year")) {
                return then.format("D MMMM")
            } else {
                return then.format("D MMMM YYYY")
            }
        } else {
            let result = "";
            if (then.isSame(now, "day")) {
                result = "Today, " + then.format("HH:mm")
            } else if (then.isSame(now.clone().add(1, "day"), "day")) {
                result = "Tomorrow, " + then.format("HH:mm")
            } else {
                result = then.format("dddd") + ", " + then.format("HH:mm")
            }

            const allMinutes = moment.duration(then.diff(now)).asMinutes();
            if (allMinutes > 180 || allMinutes < 1) {
                return result;
            }
            const minutes = allMinutes % 60;
            const hours = Math.floor(allMinutes / 60);
            if (hours > 0 && minutes === 0) {
                return result + " (in " + hours + "h)"
            } else if (hours === 0 && minutes > 0) {
                return result + " (in " + minutes + "m)"
            } else {
                return result + " (in " + hours + "h " + minutes + "m)"
            }

        }
    }


    

    return moment().toISOString()
}

