const defaultContacts = [
  {
    id: 1,
    initials: 'BB',
    name: 'Bryan Barnes',
    role: 'BRANCH_MANAGER',
    company: 'Refrigeration Supplies Distributor',
    branch: 'RSD Store # 77',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-900',
    hasPhone: false,
    hasEmail: true,
    workEmail: 'bbarnes@rsd.net',
    orders: 3,
    needsPayment: 3,
    totalSales: '$10k+..',
  },
  {
    id: 2,
    initials: 'JB',
    name: 'Jason Bills',
    role: 'Estimator',
    company: 'AirReps',
    branch: 'Headquarters',
    tier: null,
    status: 'Active',

    color: 'bg-indigo-800',
    hasPhone: true,
    hasEmail: false,
    phones: [{ type: 'Mobile-Unknown', number: '(360) 750-8558', primary: true }],
  },
  {
    id: 3,
    initials: 'BB',
    name: 'Ben Blevens-Silbernagel',
    role: 'Purchaser',
    company: 'Refrigeration Supplies Distributor',
    branch: 'RSD Store # 77',
    tier: 'Tier 2',
    status: 'Active',

    color: 'bg-gray-500',
    hasPhone: false,
    hasEmail: true,
  },
  {
    id: 4,
    initials: 'RB',
    name: 'Ryan Brown',
    role: 'Estimator',
    company: 'AirReps',
    branch: 'Headquarters',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-800',
    hasPhone: true,
    hasEmail: true,
    phones: [{ type: 'Mobile-Business', number: '(425) 478-6990', primary: true }],
  },
  {
    id: 5,
    initials: 'AC',
    name: 'Aaron Cohn',
    role: 'SALES_REP',
    company: 'AirReps',
    branch: 'Headquarters',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-700',
    hasPhone: true,
    hasEmail: true,
    phones: [{ type: 'Mobile-Unknown', number: '(847) 561-5285', primary: true }],
  },
  {
    id: 6,
    initials: 'HG',
    name: 'Heather Giltner',
    role: 'PROJECT_ASSISTANT',
    company: 'AirReps',
    branch: 'Lake Oswego',
    tier: 'Tier 2',
    status: 'Active',

    color: 'bg-gray-500',
    hasPhone: true,
    hasEmail: true,
    phones: [],
  },
  {
    id: 7,
    initials: 'RG',
    name: 'Rob Grace',
    role: 'Project Manager',
    company: 'AirReps',
    branch: 'Lake Oswego',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-800',
    hasPhone: true,
    hasEmail: true,
    phones: [],
  },
  {
    id: 8,
    initials: 'MG',
    name: 'Matt Gregg',
    role: 'SALES_REP',
    company: 'AirReps',
    branch: 'Headquarters',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-800',
    hasPhone: true,
    hasEmail: true,
    phones: [],
  },
  {
    id: 9,
    initials: 'TM',
    name: 'Tyson McGraw',
    role: 'SALES_REP',
    company: 'AirReps',
    branch: 'Lake Oswego',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-800',
    hasPhone: true,
    hasEmail: true,
    phones: [],
  },
  {
    id: 10,
    initials: 'MZ',
    name: 'Mike Zimmerman',
    role: 'SALES_REP',
    company: 'AirReps',
    branch: 'Headquarters',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-700',
    hasPhone: true,
    hasEmail: true,
    phones: [],
  },
  {
    id: 11,
    initials: 'SL',
    name: 'Sara Lee',
    role: 'SALES_REP',
    company: 'Refrigeration Supplies Distributor',
    branch: 'RSD Store # 77',
    tier: 'Tier 1',
    status: 'Active',

    color: 'bg-indigo-800',
    hasPhone: true,
    hasEmail: true,
    phones: [{ type: 'Mobile-Unknown', number: '(206) 555-0220', primary: true }],
  },
  {
    id: 12,
    initials: 'TM',
    name: 'Tom Miller',
    role: 'BRANCH_MANAGER',
    company: 'Refrigeration Supplies Distributor',
    branch: 'Headquarters',
    tier: null,
    status: 'Active',

    color: 'bg-indigo-900',
    hasPhone: true,
    hasEmail: true,
    phones: [{ type: 'Mobile-Unknown', number: '(206) 555-0210', primary: true }],
  },
]

function loadContacts() {
  try {
    const saved = localStorage.getItem('contacts')
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return defaultContacts
}

function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}

export const contacts = loadContacts()

export function updateContact(id, updates) {
  const index = contacts.findIndex((c) => c.id === id)
  if (index === -1) return
  contacts[index] = { ...contacts[index], ...updates }
  saveContacts()
}
