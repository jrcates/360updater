import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  SlidersHorizontal,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { quotes } from '../data/quotes'

const ITEMS_PER_PAGE = 8

export default function QuotesContent() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(quotes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentQuotes = quotes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700'
      case 'Pending Review':
        return 'bg-orange-100 text-orange-700'
      case 'Draft':
        return 'bg-gray-100 text-gray-600'
      case 'Sent to Customer':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-8 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <FileText size={15} className="text-gray-400" />
        <span className="font-medium text-gray-700">Quotes</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quote Directory</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all upcoming curb adapter quotes.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shrink-0">
            <Plus size={16} />
            New Quote
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 bg-white rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search quotes..."
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
          <FileText size={15} />
          <span>{quotes.length} quotes</span>
        </div>

        {/* Quote Cards */}
        <div className="space-y-4 mb-8">
          {currentQuotes.map((quote) => (
            <div
              key={quote.id}
              onClick={() => navigate(`/quotes/${quote.id}`)}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Top row: Order ID + Status + Arrow */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-indigo-600">
                    {quote.id}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusStyle(quote.status)}`}
                  >
                    {quote.status}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Project Name */}
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                {quote.projectName}
              </h3>

              {/* Details grid */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                    Adapter Name
                  </p>
                  <p className="text-sm text-gray-700">{quote.adapterName}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                    360 Contact
                  </p>
                  <p className="text-sm text-gray-700">{quote.contact}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                    360 Customer
                  </p>
                  <p className="text-sm text-gray-700">{quote.customer}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                    Configuration Date
                  </p>
                  <p className="text-sm text-gray-700">{formatDate(quote.configDate)}</p>
                </div>
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
