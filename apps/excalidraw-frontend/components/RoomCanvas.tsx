'use client'

import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../config";
import Canvas from "../components/Canvas";

export function RoomCanvas({roomId}:{roomId : string}){
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZjhjOTQ5YS1mMmZmLTQ4MzgtOTA2ZS1jMjNiMmE3OWYxNjQiLCJpYXQiOjE3NDU4NTIxMjV9.LsbiouJ9SmBsG-6aJjmtyqfZZ51r5lxrFoIVPg3_Mmw`);

        ws.onopen = () =>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }

        ws.onerror = (err) =>{
            console.error("Websocket error:",err)
        }

        ws.onclose = () =>{
            console.log("Websocket Closed")
        }
    },[roomId])
   
    if(!socket){
        return(
            <div>
                Connecting to server...
            </div>
        )
    }

    return(
        <div>
            <Canvas roomId={roomId} socket={socket}/>    
        </div>
    )
}