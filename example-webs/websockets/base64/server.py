#!/usr/bin/env python

# WS server that sends messages at random intervals
# Reference: https://websockets.readthedocs.io/en/stable/intro.html

import asyncio
import datetime
import random, websockets, base64

async def time(websocket, path):
    while True:
        now = datetime.datetime.utcnow().isoformat() + "Z"
        messageb64 = now.encode("ascii")
        messageb64 = base64.b64encode(messageb64)
        messageb64 = messageb64.decode("ascii")
        await websocket.send(messageb64)
        await asyncio.sleep(random.random() * 3)

start_server = websockets.serve(time, "127.0.0.1", 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
