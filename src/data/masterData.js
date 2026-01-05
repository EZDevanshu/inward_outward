// src/data/masterData.js
// Mock master data for dropdowns and stats
// TODO: Replace with API: fetch('/api/masters')

const DEFAULT_OFFICES = [
  'Collector Office, Rajkot',
  'Mamlatdar Office, Gondal',
  'District Panchayat Office',
  'Municipal Corporation',
  'Block Development Office',
  'Taluka Development Office',
  'SDM Office',
  'District Education Office'
];

const DEFAULT_COURIERS = [
  'DTDC',
  'Blue Dart',
  'India Post',
  'Speed Post',
  'FedEx'
];

const DEFAULT_MODES = ['Courier', 'By Hand', 'Email', 'Post'];

const LS_KEYS = {
  offices: 'master_offices',
  couriers: 'master_couriers',
  modes: 'master_modes',
  fromto: 'master_fromto'
};

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [...fallback];
    return JSON.parse(raw);
  } catch (e) {
    return [...fallback];
  }
};

const write = (key, arr) => {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    console.error('Failed to write master data', e);
  }
};

export const getOffices = () => read(LS_KEYS.offices, DEFAULT_OFFICES);
export const addOffice = (name) => {
  const list = read(LS_KEYS.offices, DEFAULT_OFFICES);
  list.unshift(name);
  write(LS_KEYS.offices, list);
  return list;
};

export const getCouriers = () => read(LS_KEYS.couriers, DEFAULT_COURIERS);
export const addCourier = (name) => {
  const list = read(LS_KEYS.couriers, DEFAULT_COURIERS);
  list.unshift(name);
  write(LS_KEYS.couriers, list);
  return list;
};

export const getModes = () => read(LS_KEYS.modes, DEFAULT_MODES);
export const addMode = (name) => {
  const list = read(LS_KEYS.modes, DEFAULT_MODES);
  list.unshift(name);
  write(LS_KEYS.modes, list);
  return list;
};

export const getFromTo = () => read(LS_KEYS.fromto, []);
export const addFromTo = (obj) => {
  const list = read(LS_KEYS.fromto, []);
  list.unshift(obj);
  write(LS_KEYS.fromto, list);
  return list;
};

export const deleteOffice = (index) => {
  const list = read(LS_KEYS.offices, DEFAULT_OFFICES);
  list.splice(index, 1);
  write(LS_KEYS.offices, list);
  return list;
};

export const deleteCourier = (index) => {
  const list = read(LS_KEYS.couriers, DEFAULT_COURIERS);
  list.splice(index, 1);
  write(LS_KEYS.couriers, list);
  return list;
};

export const deleteMode = (index) => {
  const list = read(LS_KEYS.modes, DEFAULT_MODES);
  list.splice(index, 1);
  write(LS_KEYS.modes, list);
  return list;
};

export const deleteFromTo = (index) => {
  const list = read(LS_KEYS.fromto, []);
  list.splice(index, 1);
  write(LS_KEYS.fromto, list);
  return list;
};

export const masterData = {
  getOffices,
  addOffice,
  deleteOffice,
  getCouriers,
  addCourier,
  deleteCourier,
  getModes,
  addMode,
  deleteMode,
  getFromTo,
  addFromTo,
  deleteFromTo
};
