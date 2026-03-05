import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  SlidersHorizontal,
  Users,
  Building2,
  MapPin,
  Mail,
  FileText,
  ArrowRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Phone,
  Star,
} from 'lucide-react'
import { contacts } from '../data/contacts'
import { resolveContactCardPhones, calculateProfileCompletion } from '../utils/phoneResolution'
import { PHONE_TYPE_LABELS } from '../constants/phoneTypes'

const ITEMS_PER_PAGE = 9

export default function ContactsContent() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentContacts = contacts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getCompletionColor = (pct) => {
    if (pct >= 80) return 'bg-green-500'
    if (pct >= 60) return 'bg-orange-400'
    return 'bg-red-400'
  }

  const getTierColor = (tier) => {
    if (tier === 'Tier 1') return 'bg-indigo-600 text-white'
    if (tier === 'Tier 2') return 'bg-orange-400 text-white'
    return 'bg-gray-200 text-gray-600'
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <Users size={15} className="text-gray-400" />
        <span className="font-medium text-gray-700">Contacts</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Directory</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and view all your client relationships.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shrink-0">
            <Plus size={16} />
            New Contact
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 bg-white rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
          <Users size={15} />
          <span>{contacts.length} contacts</span>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {currentContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => navigate(`/contacts/${contact.id}`)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Top row: avatar + badges + menu */}
              <div className="flex items-start justify-between mb-4">
                {contact.profilePicture ? (
                  <img
                    src={contact.profilePicture}
                    alt={contact.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shrink-0"
                  />
                ) : (
                  <div
                    className={`w-14 h-14 rounded-full ${contact.color} text-white text-sm font-bold flex items-center justify-center shrink-0`}
                  >
                    {contact.initials}
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-end gap-1">
                    {contact.tier && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${getTierColor(contact.tier)}`}
                      >
                        {contact.tier}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded">
                      {contact.status}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Name + role */}
              <h3 className="font-bold text-gray-900 mb-0.5">{contact.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                <UserCheck size={12} className="text-gray-400" />
                {contact.role}
              </div>

              {/* Company + Branch */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building2 size={13} className="text-gray-400 shrink-0" />
                  <span className="truncate">{contact.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={13} className="text-orange-400 shrink-0" />
                  <span className="truncate">{contact.branch}</span>
                </div>
              </div>

              {/* Phone Numbers */}
              {(() => {
                const { linePhone, mobilePhone } = resolveContactCardPhones(contact)
                const phones = [linePhone, mobilePhone].filter(Boolean)
                if (phones.length === 0) return null
                return (
                  <div className="space-y-1.5 mb-4">
                    {phones.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={13} className="text-gray-400 shrink-0" />
                        <span className="truncate">{p.number}</span>
                        <span className="text-[10px] text-gray-400">({PHONE_TYPE_LABELS[p.type] || p.type})</span>
                        {p.type.startsWith('Branch-') && (
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">Branch</span>
                        )}
                        {(p.isPreferred || p.type.startsWith('Branch-')) && (
                          <Star size={10} fill="currentColor" className="text-indigo-500 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )
              })()}

              {/* Profile Completion Bar */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full ${getCompletionColor(calculateProfileCompletion(contact))} rounded-full`}
                      style={{ width: `${calculateProfileCompletion(contact)}%` }}
                    />
                    <span className="absolute inset-0 flex items-center px-2.5 text-[10px] font-semibold text-white">
                      Profile Completion {calculateProfileCompletion(contact)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom row: actions + view profile */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {contact.hasEmail && (
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Mail size={15} />
                    </button>
                  )}
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FileText size={15} />
                  </button>
                </div>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  View Profile
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-white border border-gray-300 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
