import asyncio
import websockets

import json


from datetime import datetime

def generate_id():
    now = datetime.now()
    timestamp = now.strftime("%Y%m%d%H%M%S%f")
    return timestamp


# 192.168.100.25:80
async def send_message():
    async with websockets.connect(
        "ws://192.168.1.189:8000/ws/robot/uv3x"
    ) as websocket:
        
        while True:
            # message = input("Enter a message (or 'quit' to exit): ")
            # msg = {
            #     "type": "robot_message",
            #     "data": {
            #         "message": message
            #     }
                
            # }
            # if message.lower() == "quit":
            #     break

            # await websocket.send(json.dumps(msg))
            

            data = await websocket.recv()
            print(f"Received: {data}")


asyncio.run(send_message())