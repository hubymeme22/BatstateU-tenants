import requests as re
import json
import hashlib

apiURI = 'http://localhost:5050/api/register/student'
JSONParsed = json.load(open('boysTenants.json', 'r'))
formattedData = []

index = 1
for account in JSONParsed:
    if ((account['SR-Code.1'] == None) or (account['Name'] == None)):
        continue

    # for names that has middlename
    if ('.' in account['Name']):
        parsedName = account['Name'].split('.')
        last = parsedName[1][1:]
        middle = parsedName[0][len(parsedName[0]) - 1:]
        first = parsedName[0][:len(parsedName[0]) - 2]

    # names that has no middlenames
    else:
        parsedName = account['Name'].split(' ')
        last = parsedName[len(parsedName) - 1]
        middle = ''
        first = ' '.join(parsedName[:len(parsedName) - 1])

    jsonFormat = {
        'username': account['SR-Code.1'],
        'email': account['SR-Code.1'] + '@g.batstate-u.edu.ph',
        'contact': '09000000000',
        'password': hashlib.md5((account['SR-Code.1'] + 'password').encode()).hexdigest(),
        'name': {
            'first': first,
            'middle': middle,
            'last': last
        }
    }

    print('[+] Adding the ff. account: ')
    print(jsonFormat)

    x = re.post(apiURI, json=jsonFormat)
    print(x)
    print('=====================')
    pass