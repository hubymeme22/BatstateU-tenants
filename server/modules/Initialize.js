import { Room } from "../models/rooms.js";
import fs from 'fs';

// before using the apis, make sure that the genesiss
// room is created, to make sure that the students with no
// will be placed here
console.log('[*] Checking for exisence of genesis room...');
export function genesisRoomInitialize() {
    Room.findOne({label: 'genesis'})
    .then(roomdata => {
        if (roomdata != null)
            return console.log('[+] Genesis room exists!');

        console.log('[!] No Genesis room... Adding one...');
        const genesisRoom = new Room({
            slot: 'GN-01',
            users: [],
            userref: [],
            max_slot: 99999,
            available_slot: 99999,
            status: 'not occupied',
            label: 'genesis',
            bills: []
        });

        genesisRoom.save()
            .then(res => {
                console.log('[+] Successfully created genesis room!');
            }).catch(err => {
                console.log('[-] Cannot create room due to some error...');
                console.error(err);
            });
    }).catch(err => {
        console.log('[-] Cannot check due to some error:');
        console.error(err);
    });
}

export function tmpFolderInitialize() {
    console.log('[+] Adding tmp folder...');
    fs.mkdir('./server/tmp', (err) => {
        if (err) console.log('[*] Error occured in generating tmp folder');
    });
}