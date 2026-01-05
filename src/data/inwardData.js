
export const inwardData = [
  {
    inwardNo: 'INW/2026/001',
    date: '2026-01-04',
    from: 'Collector Office, Rajkot',
    mode: 'Courier',
    subject: 'Monthly Revenue Report'
  },
  {
    inwardNo: 'INW/2026/002',
    date: '2026-01-04',
    from: 'District Education Officer',
    mode: 'By Hand',
    subject: 'Teacher Transfer Requests'
  },
  {
    inwardNo: 'INW/2026/003',
    date: '2026-01-03',
    from: 'Municipal Corporation',
    mode: 'Email',
    subject: 'Water Supply Project Update'
  },
  {
    inwardNo: 'INW/2026/004',
    date: '2026-01-02',
    from: 'Health Department',
    mode: 'Post',
    subject: 'Vaccination Drive Report'
  },
  {
    inwardNo: 'INW/2026/005',
    date: '2026-01-01',
    from: 'Agriculture Office',
    mode: 'By Hand',
    subject: 'Crop Insurance Claims'
  }
];
const newEntriesStorage = [];

export const saveNewInward = (formData) => {
 
  const entry = {
    ...formData,
    id: Date.now(),
    created: new Date().toISOString()
  };
  newEntriesStorage.unshift(entry);
  
  const dashboardEntry = {
    inwardNo: formData.inwardNo,
    date: formData.inwardDate,
    from: formData.letterFromName || 'New Entry',
    mode: formData.mode || 'By Hand',
    subject: formData.subject
  };
  
  inwardData.unshift(dashboardEntry);
  
  if (inwardData.length > 25) {
    inwardData.splice(25);
  }
  
  console.log(`✅ SAVED & DASHBOARD UPDATED: ${dashboardEntry.inwardNo}`);
  
};

export const createInwardNo = () => {
  const year = new Date().getFullYear();
  let nextNumber = parseInt(localStorage.getItem(`inward_seq_${year}`) || '5');
  nextNumber++;
  localStorage.setItem(`inward_seq_${year}`, nextNumber);
  return `INW/${year}/${nextNumber.toString().padStart(3, '0')}`;
};

export const calculateStats = () => {
  const today = new Date().toISOString().split('T')[0];
  return {
    totalInward: inwardData.length,
    todayInward: inwardData.filter(item => item.date === today).length || 0
  };
};

export { newEntriesStorage };
