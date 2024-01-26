export const GLOBALTYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  THEME: 'THEME',
  STATUS: 'STATUS',
  MODAL: 'MODAL',
  SOCKET: 'SOCKET',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  CALL: 'CALL',
  PEER: 'PEER',
  GROUP: 'GROUP',
  employee: 'employee',
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item.id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item.id !== id);
  return newData;
};
