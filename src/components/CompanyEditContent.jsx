import { useState, useEffect, useRef } from 'react'
import {
  Building2,
  MapPin,
  GitBranch,
  Plus,
  Star,
  Trash2,
  X,
  ChevronDown,
  PanelRight,
} from 'lucide-react'
import { updateCompany } from '../data/companies'
import AddBranchModal from './AddBranchModal'

export default function CompanyEditDrawer({ company, onClose, onSaved }) {
  const [name, setName] = useState(company?.name || '')
  const [compId, setCompId] = useState(company?.companyId || '')
  const [website, setWebsite] = useState(company?.website ? `https://${company.website}` : '')
  const [companyTypes, setCompanyTypes] = useState(
    company?.tags.filter((t) => t !== 'Active' && t !== 'Inactive') || []
  )
  const [status, setStatus] = useState(company?.status || 'Active')
  const [mainAddress, setMainAddress] = useState(company?.billingAddress || '')
  const [mainCity, setMainCity] = useState(company?.city || '')
  const [mainState, setMainState] = useState(company?.state || '')
  const [mainZip, setMainZip] = useState(company?.zip || '')
  const [mainCountry, setMainCountry] = useState(company?.country || 'United States')
  const [billingSameAsMain, setBillingSameAsMain] = useState(true)
  const [billingAddress, setBillingAddress] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingState, setBillingState] = useState('')
  const [billingZip, setBillingZip] = useState('')
  const [billingCountry, setBillingCountry] = useState('United States')
  const [phones, setPhones] = useState(company?.phones || [])
  const [subCompanyTypes, setSubCompanyTypes] = useState([])
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showSubTypeDropdown, setShowSubTypeDropdown] = useState(false)
  const [emails, setEmails] = useState(company?.emails || [])
  const [showAddBranch, setShowAddBranch] = useState(false)
  const [visible, setVisible] = useState(false)
  const [viewMode, setViewMode] = useState('sidebar')
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef(null)

  const allCompanyTypes = ['Customer', 'Vendor', 'Competitor', 'Other']
  const customerSubTypes = ['HVAC Contractor', 'Mechanical Contractor', 'Plumbing Contractor', 'Sheet Metal Fabricator', 'Wholesale/Distributor', 'Equipment Rep Firm']
  const vendorSubTypes = ['Sheet Metal Supplier', 'Equipment Supplier', 'Service Provider']

  const hasCustomer = companyTypes.includes('Customer')
  const hasVendor = companyTypes.includes('Vendor')
  const showSubTypes = hasCustomer || hasVendor
  const availableSubTypes = [
    ...(hasCustomer ? customerSubTypes : []),
    ...(hasVendor ? vendorSubTypes : []),
  ]

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (viewMenuRef.current && !viewMenuRef.current.contains(e.target)) {
        setViewMenuOpen(false)
      }
    }
    if (viewMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [viewMenuOpen])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const toggleCompanyType = (type) => {
    if (companyTypes.includes(type)) {
      setCompanyTypes(companyTypes.filter((t) => t !== type))
      if (type === 'Customer' || type === 'Vendor') {
        const removedSubs = type === 'Customer' ? customerSubTypes : vendorSubTypes
        setSubCompanyTypes(subCompanyTypes.filter((s) => !removedSubs.includes(s)))
      }
    } else {
      setCompanyTypes([...companyTypes, type])
    }
  }

  const toggleSubType = (subType) => {
    if (subCompanyTypes.includes(subType)) {
      setSubCompanyTypes(subCompanyTypes.filter((s) => s !== subType))
    } else {
      setSubCompanyTypes([...subCompanyTypes, subType])
    }
  }

  const addPhone = () => {
    setPhones([...phones, { type: 'Main', number: '', primary: false }])
  }

  const updatePhone = (index, field, value) => {
    const updated = [...phones]
    updated[index] = { ...updated[index], [field]: value }
    setPhones(updated)
  }

  const removePhone = (index) => {
    setPhones(phones.filter((_, i) => i !== index))
  }

  const togglePrimary = (index) => {
    setPhones(phones.map((p, i) => ({ ...p, primary: i === index })))
  }

  const addEmail = () => {
    setEmails([...emails, { type: 'Main', address: '', primary: emails.length === 0 }])
  }

  const updateEmail = (index, field, value) => {
    const updated = [...emails]
    updated[index] = { ...updated[index], [field]: value }
    setEmails(updated)
  }

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index))
  }

  const togglePrimaryEmail = (index) => {
    setEmails(emails.map((e, i) => ({ ...e, primary: i === index })))
  }

  const handleSave = () => {
    const websiteClean = website.replace(/^https?:\/\//, '')
    const tags = [...companyTypes, status === 'Active' ? 'Active' : 'Inactive']

    updateCompany(company.id, {
      name: name || company.name,
      companyId: compId,
      website: websiteClean,
      tags,
      status,
      billingAddress: mainAddress,
      city: mainCity,
      state: mainState,
      zip: mainZip,
      country: mainCountry,
      phones,
      emails,
    })

    onSaved?.()
    handleClose()
  }

  const viewModes = [
    { key: 'modal', label: 'Modal' },
    { key: 'fullscreen', label: 'Full screen' },
    { key: 'sidebar', label: 'Sidebar' },
  ]

  const ViewModeThumbnail = ({ mode, active }) => {
    const base = 'w-[72px] h-[52px] rounded-md border bg-gray-50 relative overflow-hidden'
    const borderClass = active ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-gray-200'
    if (mode === 'modal') {
      return (
        <div className={`${base} ${borderClass} flex items-center justify-center`}>
          <div className="w-10 h-7 bg-white border border-gray-300 rounded shadow-sm" />
        </div>
      )
    }
    if (mode === 'fullscreen') {
      return (
        <div className={`${base} ${borderClass} p-1`}>
          <div className="w-full h-full bg-white border border-gray-300 rounded" />
        </div>
      )
    }
    return (
      <div className={`${base} ${borderClass} flex`}>
        <div className="flex-1" />
        <div className="w-7 h-full bg-white border-l border-gray-300" />
      </div>
    )
  }

  const panelClasses = {
    sidebar: `fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl flex flex-col transition-all duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`,
    modal: `fixed inset-0 m-auto w-full max-w-3xl max-h-[90vh] bg-white shadow-xl rounded-2xl flex flex-col transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`,
    fullscreen: `fixed inset-0 w-full h-full bg-white flex flex-col transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`,
  }

  if (!company) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div className={panelClasses[viewMode]}>
        {/* Sticky Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0 ${viewMode === 'modal' ? 'rounded-t-2xl' : ''}`}>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">Edit Company</h2>
            <span className="text-gray-300">|</span>
            <p className="text-sm text-gray-500">{company.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative" ref={viewMenuRef}>
              <button
                onClick={() => setViewMenuOpen(!viewMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                title="Change view"
              >
                <PanelRight size={18} />
              </button>
              {viewMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-10">
                  <div className="flex items-start gap-3">
                    {viewModes.map((m) => (
                      <button
                        key={m.key}
                        onClick={() => { setViewMode(m.key); setViewMenuOpen(false) }}
                        className="flex flex-col items-center gap-1.5 group"
                      >
                        <ViewModeThumbnail mode={m.key} active={viewMode === m.key} />
                        <span className={`text-xs font-medium ${viewMode === m.key ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                          {m.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Company Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={18} className="text-gray-500" />
              <h2 className="font-bold text-gray-900">Company Overview</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={compId}
                  onChange={(e) => setCompId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-4 mb-5">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company Type <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors min-h-[42px]"
                >
                  {companyTypes.length > 0 ? (
                    companyTypes.map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-md">
                        {tag}
                        <button onClick={(e) => { e.stopPropagation(); toggleCompanyType(tag) }} className="text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">Select types...</span>
                  )}
                  <ChevronDown size={16} className="text-gray-400 shrink-0 ml-auto" />
                </div>
                {showTypeDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowTypeDropdown(false)} />
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-48">
                      {allCompanyTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={companyTypes.includes(type)}
                            onChange={() => toggleCompanyType(type)}
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {showSubTypes && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sub Company Type</label>
                <div
                  onClick={() => setShowSubTypeDropdown(!showSubTypeDropdown)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors min-h-[42px]"
                >
                  {subCompanyTypes.length > 0 ? (
                    subCompanyTypes.map((sub) => (
                      <span key={sub} className="flex items-center gap-1.5 bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-md">
                        {sub}
                        <button onClick={(e) => { e.stopPropagation(); toggleSubType(sub) }} className="text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">Select sub types...</span>
                  )}
                  <ChevronDown size={16} className="text-gray-400 shrink-0 ml-auto" />
                </div>
                {showSubTypeDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSubTypeDropdown(false)} />
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-56">
                      {availableSubTypes.map((sub) => (
                        <label key={sub} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={subCompanyTypes.includes(sub)}
                            onChange={() => toggleSubType(sub)}
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Main Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={18} className="text-gray-500" />
              <h2 className="font-bold text-gray-900">Main Address</h2>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <input
                type="text"
                value={mainAddress}
                onChange={(e) => setMainAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input type="text" value={mainCity} onChange={(e) => setMainCity(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State/Province</label>
                <input type="text" value={mainState} onChange={(e) => setMainState(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Zip/Postal Code</label>
                <input type="text" value={mainZip} onChange={(e) => setMainZip(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                <div className="relative">
                  <select value={mainCountry} onChange={(e) => setMainCountry(e.target.value)} className="w-full appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-500" />
                <h2 className="font-bold text-gray-900">Billing Address</h2>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={billingSameAsMain}
                  onChange={(e) => setBillingSameAsMain(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Same as main address</span>
              </label>
            </div>
            {billingSameAsMain ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500">
                {mainAddress ? (
                  <p>{mainAddress}{mainCity ? `, ${mainCity}` : ''}{mainState ? `, ${mainState}` : ''} {mainZip} {mainCountry}</p>
                ) : (
                  <p className="text-gray-400">No main address entered yet</p>
                )}
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                  <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input type="text" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">State/Province</label>
                    <input type="text" value={billingState} onChange={(e) => setBillingState(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Zip/Postal Code</label>
                    <input type="text" value={billingZip} onChange={(e) => setBillingZip(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <div className="relative">
                      <select value={billingCountry} onChange={(e) => setBillingCountry(e.target.value)} className="w-full appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Company Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={18} className="text-gray-500" />
              <h2 className="font-bold text-gray-900">Company Contact Info</h2>
            </div>

            {/* Phones */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Phones</label>
              <div className="space-y-3">
                {phones.map((phone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {phone.type !== 'Main' && phone.type !== 'Fax' && phone.type !== 'Custom' ? (
                      <div className="relative">
                        <input type="text" value={phone.type} onChange={(e) => updatePhone(i, 'type', e.target.value)} placeholder="Label" className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors w-28" />
                        <button onClick={() => updatePhone(i, 'type', 'Main')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <select value={phone.type} onChange={(e) => { if (e.target.value === 'Custom') { updatePhone(i, 'type', '') } else { updatePhone(i, 'type', e.target.value) } }} className="appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white w-28">
                          <option>Main</option>
                          <option>Fax</option>
                          <option>Custom</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    )}
                    <input type="text" value={phone.number} onChange={(e) => updatePhone(i, 'number', e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" />
                    <button onClick={() => togglePrimary(i)} className={`p-2 rounded-lg transition-colors ${phone.primary ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                      <Star size={16} fill={phone.primary ? 'currentColor' : 'none'} />
                    </button>
                    <button onClick={() => removePhone(i)} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addPhone} className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mt-3 hover:text-gray-600 transition-colors">
                <Plus size={15} />
                Add Phone
              </button>
            </div>

            {/* Emails */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Emails</label>
              <div className="space-y-3">
                {emails.map((email, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {email.type !== 'General' && email.type !== 'Support' && email.type !== 'Custom' ? (
                      <div className="relative">
                        <input type="text" value={email.type} onChange={(e) => updateEmail(i, 'type', e.target.value)} placeholder="Label" className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors w-28" />
                        <button onClick={() => updateEmail(i, 'type', 'General')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <select value={email.type} onChange={(e) => { if (e.target.value === 'Custom') { updateEmail(i, 'type', '') } else { updateEmail(i, 'type', e.target.value) } }} className="appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white w-28">
                          <option>General</option>
                          <option>Support</option>
                          <option>Custom</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    )}
                    <input type="text" value={email.address} onChange={(e) => updateEmail(i, 'address', e.target.value)} placeholder="email@company.com" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400" />
                    <button onClick={() => togglePrimaryEmail(i)} className={`p-2 rounded-lg transition-colors ${email.primary ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                      <Star size={16} fill={email.primary ? 'currentColor' : 'none'} />
                    </button>
                    <button onClick={() => removeEmail(i)} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addEmail} className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mt-3 hover:text-gray-600 transition-colors">
                <Plus size={15} />
                Add Email
              </button>
            </div>
          </div>

          {/* Branches */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <GitBranch size={18} />
                Branches
              </div>
              <button onClick={() => setShowAddBranch(true)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Plus size={15} />
                Add Branch
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Manage branches from the company detail page. Use &quot;Add Branch&quot; to create a new branch for this company.
            </p>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
          <button onClick={handleClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {showAddBranch && (
        <AddBranchModal
          companyName={company.name}
          onClose={() => setShowAddBranch(false)}
        />
      )}
    </div>
  )
}
