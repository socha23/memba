import moment from 'moment'

export default function deadlineColor(deadline) {
    const m = moment(deadline);

    if (m.isBefore(moment().endOf("day"))) {
        // today, or in past
        return "#f00"
    } else if (m.isBefore(moment().startOf("day").add(7, "days"))) {
        // this week
        return "#f89406"
    } else {
        // further in future
        return "#888"
    }


}

