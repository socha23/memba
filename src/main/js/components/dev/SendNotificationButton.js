import React from 'react'
import {jsonGet} from "../../logic/apiHelper";

const SendNotificationButton = ({todo}) =>
    <button className="btn btn-primary btn-block"
            onClick={e => {
                return jsonGet("/dev/pushTodo/" + todo.id).success;
            }}
    >
        Send notification
    </button>;

export default SendNotificationButton;


