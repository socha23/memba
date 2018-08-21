import React from 'react'
import {backgroundNoneValue} from "../backgrounds";

const Background = ({value, style = {}, className = ""}) => <div className={className} style={{
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.15,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    backgroundImage: (value || backgroundNoneValue) === backgroundNoneValue ?
        "none" :
        "url('backgrounds/" + value + "')",
    ...style
}}/>;

export default Background;