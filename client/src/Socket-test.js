import React, { useState } from 'react'
import webSocket from 'socket.io-client'

const SockTest = () => {
    const [wsState, setWsState] = useState('');

    const connectWebSocket = () => {
        //開啟
        const ws = webSocket('http://nodejs-chat-service')
        console.log("connet!!");
        ws.emit('test-emit', '只回傳給發送訊息的 client')
        ws.on('socket-on', message => {
            console.log(message)
            setWsState(message);
        })
    }

    return (
        <div>
            <input type='button' value='連線' onClick={connectWebSocket} />
            Websocket 傳回訊息:{wsState}
        </div>
    )
}

export default SockTest;