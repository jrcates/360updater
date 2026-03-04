import { useState, useEffect, useRef } from 'react'
import {
  Users,
  Building2,
  Phone,
  Mail,
  Globe,
  Plus,
  Star,
  Trash2,
  X,
  ChevronDown,
  AlertCircle,
  StickyNote,
  PanelRight,
} from 'lucide-react'
import { updateContact } from '../data/contacts'
import { CONTACT_PHONE_TYPES, DEFAULT_CONTACT_PHONE_TYPE, CONTACT_EMAIL_TYPES, DEFAULT_CONTACT_EMAIL_TYPE } from '../constants/phoneTypes'
import { resolveBranchPhonesForContact, resolveBranchEmailForContact, resolveCompanyPhonesForContact, resolveCompanyEmailsForContact, calculateProfileCompletion } from '../utils/phoneResolution'
import PhoneRow from './shared/PhoneRow'

export default function ContactEditDrawer({ contact, onClose, onSaved }) {
  const [firstName, setFirstName] = useState(() => contact?.name.split(' ')[0] || '')
  const [lastName, setLastName] = useState(() => contact?.name.split(' ').slice(1).join(' ') || '')
  const [preferredName, setPreferredName] = useState(() => contact?.name.split(' ')[0] || '')
  const [tier, setTier] = useState(contact?.tier || 'A - Key Contact')
  const [company, setCompany] = useState(contact?.company || '')
  const [positions, setPositions] = useState(contact?.role ? [contact.role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/ \w/g, (c) => c)] : [])
  const [branch, setBranch] = useState(contact?.branch || '')
  const [contactEmails, setContactEmails] = useState(
    contact?.workEmail ? [{ type: 'Business Email', value: contact.workEmail, primary: true }] : []
  )
  const [contactPhones, setContactPhones] = useState(
    contact?.phones?.length ? contact.phones : []
  )
  const [notes, setNotes] = useState('')
  const [visible, setVisible] = useState(false)
  const [viewMode, setViewMode] = useState('sidebar') // 'sidebar' | 'modal' | 'fullscreen'
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef(null)

  const companyPhones = contact ? resolveCompanyPhonesForContact(contact) : []
  const companyEmails = contact ? resolveCompanyEmailsForContact(contact) : []
  const branchPhones = contact ? resolveBranchPhonesForContact(contact) : []
  const branchEmail = contact ? resolveBranchEmailForContact(contact) : null
  // Deduplicate branch phones that match company phones
  const seenNumbers = new Set(companyPhones.map((p) => p.number))
  const uniqueBranchPhones = branchPhones.filter((p) => !seenNumbers.has(p.number))
  const seenEmails = new Set(companyEmails.map((e) => e.address))
  const uniqueBranchEmail = branchEmail && !seenEmails.has(branchEmail) ? branchEmail : null

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
    // sidebar
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

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const updateContactPhone = (index, updated) => {
    const next = [...contactPhones]
    next[index] = updated
    setContactPhones(next)
  }

  const deleteContactPhone = (index) => {
    setContactPhones(contactPhones.filter((_, i) => i !== index))
  }

  const toggleContactPhonePrimary = (index) => {
    setContactPhones(contactPhones.map((p, i) => ({ ...p, primary: i === index })))
  }

  const addContactPhone = () => {
    setContactPhones([...contactPhones, { type: DEFAULT_CONTACT_PHONE_TYPE, number: '', primary: false }])
  }

  const getCompletionColor = (pct) => {
    if (pct >= 80) return 'bg-green-500'
    if (pct >= 60) return 'bg-orange-400'
    return 'bg-red-400'
  }

  const handleSave = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    updateContact(contact.id, {
      name: fullName || contact.name,
      initials,
      role: positions[0] || contact.role,
      company,
      branch,
      tier: tier.startsWith('A') ? 'Tier 1' : tier.startsWith('B') ? 'Tier 2' : null,
      phones: contactPhones,
      emails: contactEmails,
      workEmail: contactEmails.find((e) => e.primary)?.value || contactEmails[0]?.value || '',
      hasEmail: contactEmails.length > 0 || !!branchEmail || companyEmails.length > 0,
      hasPhone: contactPhones.length > 0 || branchPhones.length > 0 || companyPhones.length > 0,
      notes,
    })

    onSaved?.()
    handleClose()
  }

  const removePosition = (pos) => {
    setPositions(positions.filter((p) => p !== pos))
  }

  const addContactEmail = () => {
    setContactEmails([...contactEmails, { type: DEFAULT_CONTACT_EMAIL_TYPE, value: '', primary: false }])
  }

  const updateContactEmail = (index, field, value) => {
    const updated = [...contactEmails]
    updated[index] = { ...updated[index], [field]: value }
    setContactEmails(updated)
  }

  const removeContactEmail = (index) => {
    setContactEmails(contactEmails.filter((_, i) => i !== index))
  }

  const togglePrimaryEmail = (index) => {
    setContactEmails(contactEmails.map((e, i) => ({ ...e, primary: i === index })))
  }

  if (!contact) return null

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
        <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0 ${viewMode === 'fullscreen' ? '' : ''} ${viewMode === 'modal' ? 'rounded-t-2xl' : ''}`}>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">Edit Contact</h2>
            <span className="text-gray-300">|</span>
            <p className="text-sm text-gray-500">{contact.name}</p>
          </div>
          <div className="flex items-center gap-1">
            {/* View Mode Toggle */}
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
          {/* Profile Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-4">
              <Users size={16} className="text-gray-500" />
              Profile Overview
            </div>
            <div className="mb-2">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  className={`h-full ${getCompletionColor(calculateProfileCompletion(contact))} rounded-full`}
                  style={{ width: `${calculateProfileCompletion(contact)}%` }}
                />
                <span className="absolute inset-0 flex items-center px-3 text-[11px] font-semibold text-white">
                  Profile Completion {calculateProfileCompletion(contact)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-orange-600">
              <AlertCircle size={13} />
              <span>Missing: Business Phone, Personal Phone, LinkedIn Profile</span>
              <ChevronDown size={13} />
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <Building2 size={16} className="text-gray-500" />
              Company Information
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 pr-14 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Positions <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                  {positions.map((pos) => (
                    <span key={pos} className="flex items-center gap-1.5 bg-gray-100 text-sm text-gray-700 px-3 py-0.5 rounded-md">
                      {pos}
                      <button onClick={() => removePosition(pos)} className="text-gray-400 hover:text-gray-600">
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Search positions..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 min-w-[100px]"
                  />
                  <ChevronDown size={14} className="text-gray-400 shrink-0" />
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              No company yet? <span className="font-semibold text-gray-900 cursor-pointer">+ Create Company</span>
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Branch</label>
              <div className="relative">
                <input
                  type="text"
                  value={`${branch} (Vancouver)`}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 pr-14 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <Users size={16} className="text-gray-500" />
              Personal Information
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Name</label>
                <input
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Relationship Tier</label>
                <div className="relative">
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                  >
                    <option>A - Key Contact</option>
                    <option>B - Important</option>
                    <option>C - Regular</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <Phone size={16} className="text-gray-500" />
              Phone Numbers
            </div>

            {companyPhones.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">From Branch</p>
                <div className="space-y-2">
                  {companyPhones.map((phone, i) => (
                    <PhoneRow key={`co-${i}`} phone={phone} readOnly />
                  ))}
                </div>
              </div>
            )}

            {uniqueBranchPhones.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">From Branch</p>
                <div className="space-y-2">
                  {uniqueBranchPhones.map((phone, i) => (
                    <PhoneRow key={`br-${i}`} phone={phone} readOnly />
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm font-medium text-gray-700 mb-2">Contact Phones</p>
            {contactPhones.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 text-center mb-2">
                No contact phones added
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                {contactPhones.map((phone, i) => (
                  <PhoneRow
                    key={i}
                    phone={phone}
                    typeOptions={CONTACT_PHONE_TYPES}
                    onUpdate={(updated) => updateContactPhone(i, updated)}
                    onDelete={() => deleteContactPhone(i)}
                    onTogglePrimary={() => toggleContactPhonePrimary(i)}
                  />
                ))}
              </div>
            )}
            <button
              onClick={addContactPhone}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            >
              <Plus size={15} />
              Add Phone
            </button>
          </div>

          {/* Email Addresses */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <Mail size={16} className="text-gray-500" />
              Email Addresses
            </div>

            {companyEmails.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">From Branch</p>
                <div className="space-y-2">
                  {companyEmails.map((email, i) => (
                    <div key={`co-${i}`} className="flex items-center gap-2">
                      <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 w-40">
                        {email.type}
                      </div>
                      <input
                        type="text"
                        value={email.address}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uniqueBranchEmail && (
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">From Branch</p>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 w-40">
                    Branch Email
                  </div>
                  <input
                    type="text"
                    value={uniqueBranchEmail}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            <p className="text-sm font-medium text-gray-700 mb-2">Contact Emails</p>
            {contactEmails.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 text-center mb-2">
                No contact emails added
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                {contactEmails.map((email, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={email.type}
                        onChange={(e) => updateContactEmail(i, 'type', e.target.value)}
                        className="appearance-none px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white w-40"
                      >
                        {CONTACT_EMAIL_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <input
                      type="text"
                      value={email.value}
                      onChange={(e) => updateContactEmail(i, 'value', e.target.value)}
                      placeholder="email@example.com"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                    />
                    <button
                      onClick={() => togglePrimaryEmail(i)}
                      className={`p-2 rounded-lg transition-colors ${
                        email.primary
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Star size={16} fill={email.primary ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => removeContactEmail(i)}
                      className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={addContactEmail}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            >
              <Plus size={15} />
              Add Email
            </button>
          </div>

          {/* Social Profiles */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <Globe size={16} className="text-gray-500" />
              Social Profiles
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 text-center mb-2">
              No social profiles added
            </div>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
              <Plus size={15} />
              Add Profile
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-5">
              <StickyNote size={16} className="text-gray-500" />
              Notes
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this contact..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors resize-y min-h-[100px] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
