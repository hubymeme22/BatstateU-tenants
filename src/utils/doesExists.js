export function doesRoomExist(roomName, label, objectList) {
  return objectList.some(
    (obj) => obj.slot_id == roomName && obj.label == label
  );
}
