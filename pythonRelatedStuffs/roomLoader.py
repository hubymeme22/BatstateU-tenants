import requests

uri = 'http://localhost:5050/api/admin/slots/new'
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJfaWQiOiI2NDA5ZTUyMTEyOWU4MzdmMGY2MjMwMzQiLCJlbWFpbCI6ImFkbWluIiwicGFzc3dvcmQiOiJvaCBubywgd2h5IHUgbG9va2luPyIsImFjY2VzcyI6ImFkbWluIn0sImlhdCI6MTY3ODcyOTU4M30.bXYLAtAbJrHN3USEah0T6qaPwDRo-W6Gl8mjzhmgDN8'

print('[+] Adding rooms....')

# add dorm rooms
numberOfRooms = 6
for i in range(1, numberOfRooms + 1):
    if (i < 10): slotName = f'RM-0{i}'
    else: slotName = f'RM-{i}'

    # format for the request
    jsonFormat = {
        "slot_id": slotName,
        "max_slot": 4,
        "label": "dorm",
        "token": token
    }

    response = requests.post(uri, json=jsonFormat)
    print(jsonFormat)
    print(response)

print('[+] Adding canteens...')

# add canteen rooms
numberOfCanteens = 3
for i in range(1, numberOfCanteens + 1):
    if (i < 10): slotName = f'CN-0{i}'
    else: slotName = f'CN-{i}'

    # format for the request
    jsonFormat = {
        "slot_id": slotName,
        "max_slot": 1,
        "label": "canteen",
        "token": token
    }

    response = requests.post(uri, json=jsonFormat)
    print(jsonFormat)
    print(response)
