import { useState } from 'react'
import {
  X,
  Building2,
  ChevronDown,
  Ban,
  Search,
  UserPlus,
} from 'lucide-react'
import { addBranch } from '../data/companies'

const primaryContactOptions = [
  { label: 'None', icon: Ban, value: 'none' },
  { label: 'Search Existing', icon: Search, value: 'search' },
  { label: 'Create New', icon: UserPlus, value: 'create' },
]

export default function AddBranchModal({ companyId, companyName, onClose, onBranchAdded }) {
  const [branchType, setBranchType] = useState('')
  const [branchName, setBranchName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [branchMainPhone, setBranchMainPhone] = useState('')
  const [branchFax, setBranchFax] = useState('')
  const [email, setEmail] = useState('')
  const [primaryContact, setPrimaryContact] = useState('none')

  const handleCreate = () => {
    if (!branchType) return

    const name = branchName.trim() || city.trim() || 'New Branch'
    const location = city.trim() && state.trim() ? `${city.trim()}, ${state.trim()}` : ''

    const phones = [
      ...(branchMainPhone.trim() ? [{ type: 'Branch-Main', number: branchMainPhone.trim(), primary: true }] : []),
      ...(branchFax.trim() ? [{ type: 'Branch-Fax', number: branchFax.trim(), primary: false }] : []),
    ]

    const branch = {
      name,
      type: branchType,
      location,
      phones,
      email: email.trim() || '',
      address: streetAddress.trim(),
      city: `${city.trim()}, ${state.trim()} ${zip.trim()}`.trim(),
      country: 'USA',
    }

    addBranch(companyId, branch)
    onBranchAdded?.()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add Branch</h2>
              <p className="text-sm text-gray-500">
                Create a new branch for {companyName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Company badge */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-5">
            <Building2 size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-900">{companyName}</span>
          </div>

          {/* Branch Type / Branch Name */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Branch Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={branchType}
                  onChange={(e) => setBranchType(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors bg-white"
                >
                  <option value="" disabled>Select type...</option>
                  <option value="HQ">Headquarters</option>
                  <option value="Branch">Branch</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Office">Office</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Branch Name
              </label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="Defaults to city"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Street Address */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Street Address
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="123 Main St"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* City / State / Zip */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="CA"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Zip Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="90210"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Branch Phones */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Branch Main Phone</label>
              <input
                type="text"
                value={branchMainPhone}
                onChange={(e) => setBranchMainPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Branch Fax</label>
              <input
                type="text"
                value={branchFax}
                onChange={(e) => setBranchFax(e.target.value)}
                placeholder="(555) 123-4568"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="branch@company.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Primary Contact */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Contact
            </label>
            <div className="grid grid-cols-3 gap-0 border border-gray-200 rounded-lg overflow-hidden">
              {primaryContactOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPrimaryContact(opt.value)}
                  className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                    primaryContact === opt.value
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <opt.icon size={15} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!branchType}
              className="px-6 py-2.5 bg-indigo-700 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Branch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
