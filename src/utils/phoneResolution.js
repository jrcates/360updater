import { companies } from '../data/companies'

export function calculateProfileCompletion(contact) {
  const fields = [
    // Name has both first and last
    contact.name && contact.name.trim().includes(' '),
    // Company
    !!contact.company,
    // Role
    !!contact.role,
    // Branch
    !!contact.branch,
    // Tier
    !!contact.tier,
    // Has at least one phone number
    (contact.phones && contact.phones.length > 0) || resolveBranchPhonesForContact(contact).length > 0,
    // Has at least one email
    !!contact.workEmail || (contact.emails && contact.emails.length > 0) || !!resolveBranchEmailForContact(contact),
    // Notes
    !!contact.notes,
  ]

  const filled = fields.filter(Boolean).length
  return Math.round((filled / fields.length) * 100)
}

export function resolveBranchPhonesForContact(contact) {
  const company = companies.find((c) => c.name === contact.company)
  if (!company) return []

  const branch = company.branchList.find((b) => b.name === contact.branch)
  if (!branch) return []

  return branch.phones || []
}

export function resolveBranchEmailForContact(contact) {
  const company = companies.find((c) => c.name === contact.company)
  if (!company) return null

  const branch = company.branchList.find((b) => b.name === contact.branch)
  if (!branch) return null

  return branch.email || null
}

export function resolveCompanyPhonesForContact(contact) {
  const company = companies.find((c) => c.name === contact.company)
  if (!company) return []
  return company.phones || []
}

export function resolveCompanyEmailsForContact(contact) {
  const company = companies.find((c) => c.name === contact.company)
  if (!company) return []
  return company.emails || []
}

export function resolveContactCardPhones(contact) {
  const branchPhones = resolveBranchPhonesForContact(contact)
  const contactPhones = contact.phones || []

  // Slot 1 - Line phone: Branch-Direct > Branch-Main
  const branchDirect = contactPhones.find((p) => p.type === 'Branch-Direct')
  const branchMain = branchPhones.find((p) => p.type === 'Branch-Main')
  const linePhone = branchDirect || branchMain || null

  // Slot 2 - Mobile phone: Mobile-Business > Mobile-Unknown > Mobile-Personal (only if sole mobile)
  const mobileBusiness = contactPhones.find((p) => p.type === 'Mobile-Business')
  const mobileUnknown = contactPhones.find((p) => p.type === 'Mobile-Unknown')
  const mobilePersonal = contactPhones.find((p) => p.type === 'Mobile-Personal')
  const mobilePhones = contactPhones.filter((p) => p.type.startsWith('Mobile-'))

  let mobilePhone = mobileBusiness || mobileUnknown || null
  if (!mobilePhone && mobilePersonal && mobilePhones.length === 1) {
    mobilePhone = mobilePersonal
  }

  // Determine which phone is preferred
  const allPhones = [...contactPhones, ...branchPhones]
  const preferred = allPhones.find((p) => p.primary)

  return {
    linePhone: linePhone ? { ...linePhone, isPreferred: preferred && preferred.number === linePhone.number } : null,
    mobilePhone: mobilePhone ? { ...mobilePhone, isPreferred: preferred && preferred.number === mobilePhone.number } : null,
  }
}
