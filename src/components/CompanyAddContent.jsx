import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Info,
  Plus,
  Trash2,
  X,
  ChevronDown,
} from 'lucide-react'
import { addCompany } from '../data/companies'
import { CONTACT_PHONE_TYPES, COMPANY_PHONE_TYPES, DEFAULT_CONTACT_PHONE_TYPE } from '../constants/phoneTypes'
import PhoneRow from './shared/PhoneRow'

const COMPANY_TYPE_OPTIONS = ['Customer', 'Vendor', 'Distributor', 'Manufacturer']
const SUB_TYPE_OPTIONS = ['HVAC Contractor', 'Mechanical Contractor', 'General Contractor', 'Sheet Metal', 'Plumbing']
const STATUS_OPTIONS = ['Potential', 'Active', 'Inactive']
const POSITION_OPTIONS = ['Owner', 'Manager', 'Sales Rep', 'Estimator', 'Project Manager', 'Engineer']

function TagSelect({ label, required, options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false)

  const toggle = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt))
    } else {
      onChange([...selected, opt])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 flex-wrap min-h-[42px] px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors"
        >
          {selected.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded"
            >
              {tag}
              <X
                size={14}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(selected.filter((s) => s !== tag))
                }}
              />
            </span>
          ))}
          <span className="text-sm text-gray-400 flex-1">{selected.length === 0 ? placeholder : ''}</span>
          <ChevronDown size={16} className="text-gray-400 shrink-0" />
        </div>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-48 overflow-auto">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    selected.includes(opt) ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function CompanyAddContent() {
  const navigate = useNavigate()

  // Company Overview
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [website, setWebsite] = useState('')
  const [companyTypes, setCompanyTypes] = useState([])
  const [status, setStatus] = useState('Potential')
  const [subTypes, setSubTypes] = useState([])

  // Company Information
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('United States')
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [billingAddress, setBillingAddress] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingState, setBillingState] = useState('')
  const [billingZip, setBillingZip] = useState('')
  const [billingCountry, setBillingCountry] = useState('United States')
  const [companyPhones, setCompanyPhones] = useState([
    { type: 'Main', number: '', primary: true },
  ])
  const [companyEmails, setCompanyEmails] = useState([])

  // Primary Contact
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [position, setPosition] = useState('')
  const [contactPhones, setContactPhones] = useState([
    { type: DEFAULT_CONTACT_PHONE_TYPE, number: '', primary: true },
  ])
  const [personalEmails, setPersonalEmails] = useState([])
  const [businessEmails, setBusinessEmails] = useState([])

  const updatePhone = (list, setList, index, updated) => {
    const next = [...list]
    next[index] = updated
    setList(next)
  }

  const deletePhone = (list, setList, index) => {
    setList(list.filter((_, i) => i !== index))
  }

  const togglePrimary = (list, setList, index) => {
    setList(list.map((p, i) => ({ ...p, primary: i === index })))
  }

  const addPhone = (list, setList, defaultType) => {
    setList([...list, { type: defaultType, number: '', primary: false }])
  }

  const addEmail = (list, setList) => {
    setList([...list, ''])
  }

  const handleSave = () => {
    if (!companyName.trim()) return

    const initials = (firstName && lastName)
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : ''

    const primaryPhone = companyPhones.find((p) => p.primary)

    const newCompany = {
      name: companyName.trim(),
      companyId: companyId.trim() || companyName.substring(0, 4).toUpperCase(),
      tags: [...companyTypes, status === 'Active' ? 'Active' : ''].filter(Boolean),
      status,
      branches: 1,
      activeUsers: firstName ? 1 : 0,
      website: website.trim(),
      totalSales: '-',
      billingAddress: sameAsBilling ? address.trim() : billingAddress.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      country,
      phones: companyPhones
        .filter((p) => p.number.trim())
        .map((p) => ({ type: p.type, number: p.number.trim(), primary: p.primary })),
      branchList: [
        {
          name: 'Headquarters',
          type: 'HQ',
          location: `${city.trim()}, ${state.trim()}`,
          phones: [
            ...(companyPhones.find((p) => p.type === 'Main')
              ? [{ type: 'Branch-Main', number: companyPhones.find((p) => p.type === 'Main').number.trim(), primary: true }]
              : primaryPhone
                ? [{ type: 'Branch-Main', number: primaryPhone.number.trim(), primary: true }]
                : []),
            ...(companyPhones.find((p) => p.type === 'Fax')
              ? [{ type: 'Branch-Fax', number: companyPhones.find((p) => p.type === 'Fax').number.trim(), primary: false }]
              : []),
          ].filter((p) => p.number),
          address: address.trim(),
          city: `${city.trim()}, ${state.trim()} ${zip.trim()}`,
          country: country === 'United States' ? 'USA' : country,
        },
      ],
      employees: firstName
        ? [
            {
              initials,
              name: `${firstName.trim()} ${lastName.trim()}`,
              role: (position || 'CONTACT').toUpperCase(),
              tier: null,
              phone: contactPhones.find((p) => p.number.trim())?.number || '',
              email: businessEmails[0] || personalEmails[0] || null,
              color: 'bg-indigo-900',
            },
          ]
        : [],
    }

    addCompany(newCompany)
    navigate('/companies')
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <Building2 size={15} className="text-gray-400" />
        <span
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => navigate('/companies')}
        >
          Companies
        </span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">New Company</span>
      </div>

      <div className="px-8 py-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <button
            onClick={() => navigate('/companies')}
            className="mt-1 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Company</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Create a new company in your database
            </p>
          </div>
        </div>

        {/* Section 1: Company Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
            <Building2 size={16} className="text-gray-500" />
            Company Overview
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 mb-6">
            <Info size={18} className="text-indigo-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-indigo-700">Automatic Branch Creation</p>
              <p className="text-sm text-indigo-600 mt-0.5">
                A "Headquarters" branch will be automatically created for this company using the name and
                address details you provide below. You can add more branches later.
              </p>
            </div>
          </div>

          {/* Name / ID / Website */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Company Name<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="INTERNAL TEST"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company ID</label>
              <input
                type="text"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="TEST-1234"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="www.test.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Company Type + Status */}
          <div className="grid grid-cols-[1fr_auto] gap-4 mb-5">
            <TagSelect
              label="Company Type"
              required
              options={COMPANY_TYPE_OPTIONS}
              selected={companyTypes}
              onChange={setCompanyTypes}
              placeholder="Search types..."
            />
            <div className="w-40">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Sub Company Type */}
          <TagSelect
            label="Sub Company Type"
            options={SUB_TYPE_OPTIONS}
            selected={subTypes}
            onChange={setSubTypes}
            placeholder="Search sub types..."
          />
        </div>

        {/* Section 2: Company Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
            <MapPin size={16} className="text-gray-500" />
            Company Information
          </div>

          {/* Main Address */}
          <p className="text-sm font-semibold text-gray-900 mb-3">Main Address</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="111 Address"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 mb-3"
          />
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div>
              <label className="block text-xs text-gray-500 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Seattle"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">State/Province</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="WA"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Zip/Postal Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="98101"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Country</label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="border-t border-gray-100 pt-5 mb-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Billing Address</p>
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={(e) => setSameAsBilling(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Same as main address</span>
            </label>
            {!sameAsBilling && (
              <>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Billing address"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 mb-3"
                />
                <div className="grid grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    placeholder="City"
                    className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value)}
                    placeholder="State"
                    className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    placeholder="Zip"
                    className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                  />
                  <div className="relative">
                    <select
                      value={billingCountry}
                      onChange={(e) => setBillingCountry(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Company Phones */}
          <div className="border-t border-gray-100 pt-5 mb-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Company Phones</p>
            <div className="space-y-2 mb-2">
              {companyPhones.map((phone, i) => (
                <PhoneRow
                  key={i}
                  phone={phone}
                  typeOptions={COMPANY_PHONE_TYPES}
                  onUpdate={(updated) => updatePhone(companyPhones, setCompanyPhones, i, updated)}
                  onDelete={() => deletePhone(companyPhones, setCompanyPhones, i)}
                  onTogglePrimary={() => togglePrimary(companyPhones, setCompanyPhones, i)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => addPhone(companyPhones, setCompanyPhones, 'Support')}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Plus size={14} />
              Add Phone
            </button>
          </div>

          {/* Company Emails */}
          <div className="border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Company Emails</p>
            <div className="space-y-2 mb-2">
              {companyEmails.map((email, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const next = [...companyEmails]
                      next[i] = e.target.value
                      setCompanyEmails(next)
                    }}
                    placeholder="email@company.com"
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setCompanyEmails(companyEmails.filter((_, idx) => idx !== i))}
                    className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addEmail(companyEmails, setCompanyEmails)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Plus size={14} />
              Add Email
            </button>
          </div>
        </div>

        {/* Section 3: Primary Contact */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
            <Users size={16} className="text-gray-500" />
            Primary Contact
          </div>

          {/* Name + Position */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
              <div className="relative">
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
                >
                  <option value="">Select position...</option>
                  {POSITION_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {position && (
                  <X
                    size={14}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={() => setPosition('')}
                  />
                )}
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Contact Phones */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Contact Phones</p>
            <div className="space-y-2 mb-2">
              {contactPhones.map((phone, i) => (
                <PhoneRow
                  key={i}
                  phone={phone}
                  typeOptions={CONTACT_PHONE_TYPES}
                  onUpdate={(updated) => updatePhone(contactPhones, setContactPhones, i, updated)}
                  onDelete={() => deletePhone(contactPhones, setContactPhones, i)}
                  onTogglePrimary={() => togglePrimary(contactPhones, setContactPhones, i)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => addPhone(contactPhones, setContactPhones, DEFAULT_CONTACT_PHONE_TYPE)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Plus size={14} />
              Add Phone
            </button>
          </div>

          {/* Personal Emails */}
          <div className="border-t border-gray-100 pt-5 mb-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Personal Emails</p>
            {personalEmails.length === 0 ? (
              <div className="bg-gray-50 rounded-lg py-4 text-center text-sm text-gray-400 mb-2">
                No personal emails added
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                {personalEmails.map((email, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const next = [...personalEmails]
                        next[i] = e.target.value
                        setPersonalEmails(next)
                      }}
                      placeholder="personal@email.com"
                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setPersonalEmails(personalEmails.filter((_, idx) => idx !== i))}
                      className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => addEmail(personalEmails, setPersonalEmails)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Plus size={14} />
              Add Email
            </button>
          </div>

          {/* Business Emails */}
          <div className="border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Business Emails</p>
            {businessEmails.length === 0 ? (
              <div className="bg-gray-50 rounded-lg py-4 text-center text-sm text-gray-400 mb-2">
                No business emails added
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                {businessEmails.map((email, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const next = [...businessEmails]
                        next[i] = e.target.value
                        setBusinessEmails(next)
                      }}
                      placeholder="work@company.com"
                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setBusinessEmails(businessEmails.filter((_, idx) => idx !== i))}
                      className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => addEmail(businessEmails, setBusinessEmails)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Plus size={14} />
              Add Email
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <button
            onClick={() => navigate('/companies')}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Create Company
          </button>
        </div>
      </div>
    </main>
  )
}
