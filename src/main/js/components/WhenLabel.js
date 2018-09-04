import React from 'react'
import moment from 'moment'
import momentToString from '../momentToString'

const WhenLabel = ({when}) => <span style={{
    color: moment(when).isBefore(moment()) ? "red" : "#aaa"
}}>
    {momentToString(when)}
</span>

export default WhenLabel