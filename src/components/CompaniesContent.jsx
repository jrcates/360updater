import { useNavigate } from 'react-router-dom'
import {
  Building2,
  Plus,
  Search,
  SlidersHorizontal,
  GitBranch,
  Users,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { companies } from '../data/companies'
import SidebarToggle from './shared/SidebarToggle'

export default function CompaniesContent() {
  const navigate = useNavigate()

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <SidebarToggle />
        <Building2 size={15} className="text-gray-400" />
        <span className="font-medium text-gray-700">Companies</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Companies &amp; Branches Directory
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all your company accounts and their branch locations
            </p>
          </div>
          <button
            onClick={() => navigate('/companies/new')}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shrink-0"
          >
            <Plus size={16} />
            Add Company
          </button>
        </div>

        {/* Tabs + Search + Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-50 border-r border-gray-200">
              <Building2 size={15} />
              Entities
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              <MapPin size={15} />
              All Locations
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 bg-white rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search companies and branches..."
              className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shrink-0">
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Building2 size={15} />
          <span>{companies.length} companies</span>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-2 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => navigate(`/companies/${company.id}`)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Building2 size={22} className="text-teal-600" />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {company.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium bg-green-400 text-white px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-3">{company.name}</h3>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <GitBranch size={14} className="text-green-500" />
                  <span>{company.branches} branches</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={14} className="text-gray-400" />
                  <span>{company.activeUsers} active users</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors ml-auto">
                  View Company
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
