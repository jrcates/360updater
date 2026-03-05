const defaultOrders = [
  {
    id: 'ORD-200101',
    quoteId: 'QT-100205',
    projectName: 'Harbor View Hotel Renovation',
    status: 'Delivered',
    workflow: {
      currentStep: 4,
      steps: [
        { name: 'In Production', completedAt: '2026-02-13', description: 'All 8 curb adapter units entered production at Bellevue facility.', actor: 'Production Team' },
        { name: 'Production Complete', completedAt: '2026-02-20', description: 'All units passed QA inspection. Ready for pickup.', actor: 'QA Inspector' },
        { name: 'Shipped', completedAt: '2026-02-21', description: 'Customer picked up all 8 units from Bellevue warehouse.', actor: 'Aaron Cohn' },
        { name: 'Delivered', completedAt: '2026-02-21', description: 'All units received and confirmed by customer on-site.', actor: 'Ryan Brown' },
      ],
    },
    adapterName: 'V-31B to N-45T',
    contact: 'Aaron Cohn',
    customer: 'AirReps',
    orderDate: '2026-02-12',
    quantity: 8,
    totalPrice: 14000.00,
    oldUnit: { model: 'Rheem RLNL-C', sizes: '036/048/060' },
    newUnit: { model: 'Carrier 50XC*', sizes: '04/06/08/12' },
    shipping: { method: 'Local Pickup' },
    payment: { orderNo: 'PAY-300101', method: 'Credit Card', paidAt: '2026-02-12' },
    images: { oldUnit: 'svg:oldUnit', newUnit: 'svg:newUnit', adapter: 'svg:adapter' },
    submittals: ['ORD-200101_Curb_Adapter_Spec.pdf', 'ORD-200101_Installation_Guide.pdf'],
    lineItems: [
      { description: 'CA-2000 Curb Adapter Unit', qty: 8, unitPrice: 1480.00, total: 11840.00 },
      { description: 'Installation Hardware Kit', qty: 8, unitPrice: 55.00, total: 440.00 },
      { description: 'Insulation Gasket Set', qty: 8, unitPrice: 48.00, total: 384.00 },
      { description: 'Sealant & Flashing Package', qty: 3, unitPrice: 445.33, total: 1336.00 },
    ],
  },
  {
    id: 'ORD-200102',
    quoteId: 'QT-100208',
    projectName: 'Lakewood Community Center',
    status: 'Shipped',
    workflow: {
      currentStep: 2,
      steps: [
        { name: 'In Production', completedAt: '2026-02-01', description: '3 curb adapter units entered production.', actor: 'Production Team' },
        { name: 'Production Complete', completedAt: '2026-02-10', description: 'All units built and passed quality check.', actor: 'QA Inspector' },
        { name: 'Shipped', completedAt: null, description: 'Scheduled for customer pickup on Feb 15.', actor: null },
        { name: 'Delivered', completedAt: null, description: 'Awaiting customer confirmation of receipt.', actor: null },
      ],
    },
    adapterName: 'C-41B to F-56T',
    contact: 'Mike Zimmerman',
    customer: 'AirReps',
    orderDate: '2026-01-30',
    quantity: 3,
    totalPrice: 6300.00,
    oldUnit: { model: 'Trane THC', sizes: '036/048/060' },
    newUnit: { model: 'Lennox KGA', sizes: '048/060/072' },
    shipping: { method: 'Local Pickup' },
    payment: { orderNo: 'PAY-300102', method: 'Wire Transfer', paidAt: '2026-01-30' },
    images: { oldUnit: 'svg:oldUnit', newUnit: 'svg:newUnit', adapter: 'svg:adapter' },
    submittals: ['ORD-200102_Curb_Adapter_Spec.pdf', 'ORD-200102_Installation_Guide.pdf'],
    lineItems: [
      { description: 'CA-2400 Curb Adapter Unit', qty: 3, unitPrice: 1800.00, total: 5400.00 },
      { description: 'Installation Hardware Kit', qty: 3, unitPrice: 65.00, total: 195.00 },
      { description: 'Insulation Gasket Set', qty: 3, unitPrice: 55.00, total: 165.00 },
      { description: 'Sealant & Flashing Package', qty: 1, unitPrice: 540.00, total: 540.00 },
    ],
  },
  {
    id: 'ORD-200103',
    quoteId: 'QT-100202',
    projectName: 'Riverside Mall Rooftop Unit Replacement',
    status: 'In Production',
    workflow: {
      currentStep: 0,
      steps: [
        { name: 'In Production', completedAt: null, description: '2 curb adapter units entered production. Estimated completion: Mar 5.', actor: null },
        { name: 'Production Complete', completedAt: null, description: 'Pending production completion.', actor: null },
        { name: 'Shipped', completedAt: null, description: 'Shipping method: Local Pickup from Seattle facility.', actor: null },
        { name: 'Delivered', completedAt: null, description: 'Awaiting shipment.', actor: null },
      ],
    },
    adapterName: 'R-24B to K-38T',
    contact: 'Mike Zimmerman',
    customer: 'Refrigeration Supplies Distributors',
    orderDate: '2026-02-18',
    quantity: 2,
    totalPrice: 4200.00,
    oldUnit: { model: 'Lennox KCA', sizes: '060/072/090' },
    newUnit: { model: 'Trane Voyager', sizes: '072/090/120' },
    shipping: { method: 'Local Pickup' },
    payment: { orderNo: 'PAY-300103', method: 'Credit Card', paidAt: '2026-02-18' },
    images: { oldUnit: 'svg:oldUnit', newUnit: 'svg:newUnit', adapter: 'svg:adapter' },
    submittals: ['ORD-200103_Curb_Adapter_Spec.pdf'],
    lineItems: [
      { description: 'CA-2400 Curb Adapter Unit', qty: 2, unitPrice: 1800.00, total: 3600.00 },
      { description: 'Installation Hardware Kit', qty: 2, unitPrice: 65.00, total: 130.00 },
      { description: 'Insulation Gasket Set', qty: 2, unitPrice: 55.00, total: 110.00 },
      { description: 'Sealant & Flashing Package', qty: 1, unitPrice: 360.00, total: 360.00 },
    ],
  },
  {
    id: 'ORD-200104',
    quoteId: 'QT-100209',
    projectName: 'Northgate Shopping Plaza RTU Swap',
    status: 'Production Complete',
    workflow: {
      currentStep: 1,
      steps: [
        { name: 'In Production', completedAt: '2026-02-12', description: '5 curb adapter units entered production at main facility.', actor: 'Production Team' },
        { name: 'Production Complete', completedAt: null, description: 'Units 1-3 complete. Units 4-5 finishing final assembly.', actor: null },
        { name: 'Shipped', completedAt: null, description: 'Night delivery window required per site agreement.', actor: null },
        { name: 'Delivered', completedAt: null, description: 'Awaiting shipment.', actor: null },
      ],
    },
    adapterName: 'L-83B to S-17T',
    contact: 'Tyson McGraw',
    customer: 'Refrigeration Supplies Distributors',
    orderDate: '2026-02-10',
    quantity: 5,
    totalPrice: 16000.00,
    oldUnit: { model: 'Rheem RGEC', sizes: '072/090/102' },
    newUnit: { model: 'Trane Voyager', sizes: '090/102/120' },
    shipping: { method: 'Local Pickup' },
    payment: { orderNo: 'PAY-300104', method: 'Purchase Order', paidAt: '2026-02-10' },
    images: { oldUnit: 'svg:oldUnit', newUnit: 'svg:newUnit', adapter: 'svg:adapter' },
    submittals: ['ORD-200104_Curb_Adapter_Spec.pdf', 'ORD-200104_Installation_Guide.pdf', 'ORD-200104_Structural_Report.pdf'],
    lineItems: [
      { description: 'CA-3000 Curb Adapter Unit', qty: 5, unitPrice: 2750.00, total: 13750.00 },
      { description: 'Installation Hardware Kit', qty: 5, unitPrice: 95.00, total: 475.00 },
      { description: 'Insulation Gasket Set', qty: 5, unitPrice: 75.00, total: 375.00 },
      { description: 'Sealant & Flashing Package', qty: 2, unitPrice: 700.00, total: 1400.00 },
    ],
  },
  {
    id: 'ORD-200105',
    quoteId: 'QT-100212',
    projectName: 'Silver Creek Warehouse',
    status: 'Shipped',
    workflow: {
      currentStep: 3,
      steps: [
        { name: 'In Production', completedAt: '2026-02-08', description: '3 oversized curb adapter units entered production.', actor: 'Production Team' },
        { name: 'Production Complete', completedAt: '2026-02-18', description: 'All units passed structural load testing and QA.', actor: 'QA Inspector' },
        { name: 'Shipped', completedAt: '2026-02-22', description: 'Crane delivery arranged. Units en route to Silver Creek site.', actor: 'Sarah Connor' },
        { name: 'Delivered', completedAt: null, description: 'Delivery expected Feb 24. Customer to confirm on-site.', actor: null },
      ],
    },
    adapterName: 'H-93B to R-47T',
    contact: 'Sarah Connor',
    customer: 'Refrigeration Supplies Distributors',
    orderDate: '2026-02-05',
    quantity: 3,
    totalPrice: 19500.00,
    oldUnit: { model: 'Lennox LGH', sizes: '120/150/180' },
    newUnit: { model: 'York YC', sizes: '120/150/180' },
    shipping: { method: 'Crane Delivery', trackingNumber: 'CRN-2026-00458' },
    payment: { orderNo: 'PAY-300105', method: 'Wire Transfer', paidAt: '2026-02-05' },
    images: { oldUnit: 'svg:oldUnit', newUnit: 'svg:newUnit', adapter: 'svg:adapter' },
    submittals: ['ORD-200105_Curb_Adapter_Spec.pdf', 'ORD-200105_Structural_Report.pdf'],
    lineItems: [
      { description: 'CA-4800 Curb Adapter Unit', qty: 3, unitPrice: 5800.00, total: 17400.00 },
      { description: 'Installation Hardware Kit', qty: 3, unitPrice: 180.00, total: 540.00 },
      { description: 'Insulation Gasket Set', qty: 3, unitPrice: 120.00, total: 360.00 },
      { description: 'Sealant & Flashing Package', qty: 2, unitPrice: 600.00, total: 1200.00 },
    ],
  },
  {
    id: 'ORD-200106',
    quoteId: 'QT-100201',
    projectName: 'Downtown Office Tower HVAC Retrofit',
    status: 'In Production',
    workflow: {
      currentStep: 0,
      steps: [
        { name: 'In Production', completedAt: null, description: '4 custom curb adapter units entered production. Different specs per unit.', actor: null },
        { name: 'Production Complete', completedAt: null, description: 'Pending production completion for all 4 units.', actor: null },
        { name: 'Shipped', completedAt: null, description: 'Local Pickup from Bellevue warehouse once ready.', actor: null },
        { name: 'Delivered', completedAt: null, description: 'Awaiting production and shipment.', actor: null },
      ],
    },
    adapterName: 'T-49B to D-11T',
    contact: 'Bryan Barnes',
    customer: 'AirReps',
    orderDate: '2026-02-20',
    quantity: 4,
    totalPrice: 6000.00,
    oldUnit: { model: 'Carrier 48TC*', sizes: '08/09/12/14' },
    newUnit: { model: 'Daikin DSG', sizes: '036/048/060' },
    shipping: { method: 'Local Pickup' },
    payment: { orderNo: 'PAY-300106', method: 'Credit Card', paidAt: '2026-02-20' },
    images: { oldUnit: 'svg:oldUnit', newUnit: 'svg:newUnit', adapter: 'svg:adapter' },
    submittals: ['ORD-200106_Curb_Adapter_Spec.pdf', 'ORD-200106_Installation_Guide.pdf'],
    units: [
      {
        adapterName: 'T-49B to D-11T',
        oldUnit: { model: 'Carrier 48TC*', sizes: '08/09/12/14' },
        newUnit: { model: 'Daikin DSG', sizes: '036/048/060' },
        images: { oldUnit: 'svg:oldUnit:1', newUnit: 'svg:newUnit:1', adapter: 'svg:adapter:1' },
        unitPrice: 1050.00,
      },
      {
        adapterName: 'B-33B to L-27T',
        oldUnit: { model: 'Lennox KCA', sizes: '060/072/090' },
        newUnit: { model: 'York YC', sizes: '060/072/090' },
        images: { oldUnit: 'svg:oldUnit:2', newUnit: 'svg:newUnit:2', adapter: 'svg:adapter:2' },
        unitPrice: 1380.00,
      },
      {
        adapterName: 'F-18B to Q-42T',
        oldUnit: { model: 'Rheem RLNL-C', sizes: '036/048/060' },
        newUnit: { model: 'Trane Voyager', sizes: '072/090/120' },
        images: { oldUnit: 'svg:oldUnit:3', newUnit: 'svg:newUnit:3', adapter: 'svg:adapter:3' },
        unitPrice: 1520.00,
      },
      {
        adapterName: 'J-55B to X-73T',
        oldUnit: { model: 'York ZF', sizes: '036/048/060/072' },
        newUnit: { model: 'Carrier 50XC*', sizes: '04/06/08/12' },
        images: { oldUnit: 'svg:oldUnit:4', newUnit: 'svg:newUnit:4', adapter: 'svg:adapter:4' },
        unitPrice: 1250.00,
      },
    ],
    lineItems: [
      { description: 'Installation Hardware Kit', qty: 4, unitPrice: 45.00, total: 180.00 },
      { description: 'Insulation Gasket Set', qty: 4, unitPrice: 35.00, total: 140.00 },
      { description: 'Sealant & Flashing Package', qty: 1, unitPrice: 480.00, total: 480.00 },
    ],
  },
]

function loadOrders() {
  try {
    const saved = localStorage.getItem('orders')
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return defaultOrders
}

function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders))
}

export const orders = loadOrders()

export function updateOrder(id, updates) {
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return
  orders[index] = { ...orders[index], ...updates }
  saveOrders()
}
