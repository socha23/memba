import React from 'react'
import momentToString from '../momentToString'
import deadlineColor from '../deadlineColors'

const WhenLabel = ({when}) => <span style={{
    color: deadlineColor(when)
}}>
    {momentToString(when)}
</span>

export default WhenLabel