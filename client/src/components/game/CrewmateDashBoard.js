import React, {useEffect, useContext, useState} from 'react';
import {SocketContext} from '../../../pages/_app'

const CrewmateDashBoard = () => {
    const socket = useContext(SocketContext)
    const [task, setTask] = useState(null)

    useEffect(() => {
        socket.on('getTask', data => {
            setTask(data)
        })
    }, [socket])

    return(
        <div>
            <span>{task?.task}</span>
        </div>
    )
};

export default CrewmateDashBoard;
