import { RoomCanvas as CanvasComponent } from "../../../../components/RoomCanvas"

export default async function Canvas({params}:{
    params:{
        roomId: string
    }
}){

    const roomId = (await params).roomId
    
    
    return <CanvasComponent roomId={roomId} />
}  