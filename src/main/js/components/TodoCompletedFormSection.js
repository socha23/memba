import React from 'react'
import FormSectionContainer from './FormSectionContainer'

export default ({value, onChangeValue}) => <FormSectionContainer style={{cursor: "pointer"}}
                                                                 onClick={() => {onChangeValue(!value)}}>
                <span>
                    Completed
                </span>
    <i style={{fontSize: 40}} className={"far " + (value ? "fa-check-square" : "fa-square")}/>
</FormSectionContainer>;
