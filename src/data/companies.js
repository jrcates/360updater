const defaultCompanies = [
  {
    id: 1,
    name: 'AirReps',
    companyId: '00AY',
    tags: ['Customer', 'Vendor', 'Active'],
    status: 'Active',
    branches: 2,
    activeUsers: 8,
    website: 'airreps.com/',
    totalSales: '-',
    billingAddress: '3290 146th Pl SE, Suite F',
    city: 'Bellevue',
    state: 'OR',
    zip: '98007',
    country: 'United States',
    phones: [
      { type: 'Main', number: '(425) 562-1150', primary: true },
      { type: 'Support', number: '(425) 562-5123', primary: false },
    ],
    branchList: [
      {
        name: 'Headquarters',
        type: 'HQ',
        location: 'Bellevue, OR',
        phones: [],
        address: '3290 146th Pl SE, Suite F',
        city: 'Bellevue, OR 98007',
        country: 'USA',
      },
      {
        name: 'West Branch',
        type: 'Branch',
        location: 'Portland, OR',
        phones: [
          { type: 'Branch-Main', number: '(503) 555-0100', primary: true },
          { type: 'Branch-Fax', number: '(503) 555-0101', primary: false },
        ],
        address: '1200 NW Flanders St',
        city: 'Portland, OR 97209',
        country: 'USA',
      },
    ],
    employees: [
      {
        initials: 'JB',
        name: 'Jason Bills',
        role: 'ESTIMATOR',
        tier: null,
        phone: '(360) 750-8558',
        email: null,
        color: 'bg-indigo-900',
      },
      {
        initials: 'RB',
        name: 'Ryan Brown',
        role: 'ESTIMATOR',
        tier: 'Tier 1',
        phone: '(425) 478-6990',
        email: 'rbrown@airreps.com',
        color: 'bg-indigo-800',
      },
      {
        initials: 'AC',
        name: 'Aaron Cohn',
        role: 'SALES REP',
        tier: 'Tier 1',
        phone: '(847) 561-5285',
        email: 'aaronc@airreps.com',
        color: 'bg-indigo-700',
      },
    ],
  },
  {
    id: 2,
    name: 'Refrigeration Supplies Distributors',
    companyId: '00RS',
    tags: ['Customer', 'Active'],
    status: 'Active',
    branches: 2,
    activeUsers: 4,
    website: 'refsupply.com/',
    totalSales: '-',
    billingAddress: '500 Westlake Ave N',
    city: 'Seattle',
    state: 'WA',
    zip: '98109',
    country: 'United States',
    phones: [
      { type: 'Main', number: '(206) 555-0200', primary: true },
    ],
    branchList: [
      {
        name: 'Headquarters',
        type: 'HQ',
        location: 'Seattle, WA',
        phones: [],
        address: '500 Westlake Ave N',
        city: 'Seattle, WA 98109',
        country: 'USA',
      },
      {
        name: 'RSD Store # 77',
        type: 'Branch',
        location: 'Vancouver, WA',
        phones: [
          { type: 'Branch-Main', number: '(360) 555-0300', primary: true },
          { type: 'Branch-Fax', number: '(360) 555-0301', primary: false },
        ],
        address: '8700 NE Vancouver Mall Dr',
        city: 'Vancouver, WA 98662',
        country: 'USA',
      },
    ],
    employees: [
      {
        initials: 'TM',
        name: 'Tom Miller',
        role: 'BRANCH MANAGER',
        tier: null,
        phone: '(206) 555-0210',
        email: 'tmiller@refsupply.com',
        color: 'bg-indigo-900',
      },
      {
        initials: 'SL',
        name: 'Sara Lee',
        role: 'SALES REP',
        tier: 'Tier 1',
        phone: '(206) 555-0220',
        email: 'slee@refsupply.com',
        color: 'bg-indigo-800',
      },
    ],
  },
]

function loadCompanies() {
  try {
    const saved = localStorage.getItem('companies')
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return defaultCompanies
}

function saveCompanies() {
  localStorage.setItem('companies', JSON.stringify(companies))
}

export const companies = loadCompanies()

let nextId = companies.reduce((max, c) => Math.max(max, c.id), 0) + 1

export function addCompany(company) {
  const id = nextId++
  companies.push({ id, ...company })
  saveCompanies()
  return id
}

export function updateCompany(id, updates) {
  const company = companies.find((c) => c.id === id)
  if (!company) return
  Object.assign(company, updates)
  saveCompanies()
}

export function addBranch(companyId, branch) {
  const company = companies.find((c) => c.id === companyId)
  if (!company) return
  company.branchList.push(branch)
  company.branches = company.branchList.length
  saveCompanies()
}
