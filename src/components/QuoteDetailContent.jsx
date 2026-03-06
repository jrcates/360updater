import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  MoreVertical,
  Users,
  Package,
  Calendar,
  Download,
  ArrowRight,
  Truck,
  CreditCard,
  X,
  FileDown,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Check,
  ExternalLink,
} from 'lucide-react'
import { quotes } from '../data/quotes'
import HvacImage from './shared/HvacImage'
import SidebarToggle from './shared/SidebarToggle'

export default function QuoteDetailContent() {
  const { quoteId } = useParams()
  const navigate = useNavigate()
  const quote = quotes.find((q) => q.id === quoteId)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [activeUnit, setActiveUnit] = useState(0)
  const [selectedStep, setSelectedStep] = useState(null)

  const hasUnits = quote?.units && quote.units.length > 1
  const currentUnit = hasUnits ? quote.units[activeUnit] : null

  const tabsRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = tabsRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = tabsRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll)
    const observer = new ResizeObserver(checkScroll)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      observer.disconnect()
    }
  }, [checkScroll])

  const scrollTabs = (direction) => {
    const el = tabsRef.current
    if (!el) return
    el.scrollBy({ left: direction * 200, behavior: 'smooth' })
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  if (!quote) {
    return (
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80 flex items-center justify-center">
        <p className="text-gray-500">Quote not found.</p>
      </main>
    )
  }

  const activeAdapterName = currentUnit ? currentUnit.adapterName : quote.adapterName
  const activeOldUnit = currentUnit ? currentUnit.oldUnit : quote.oldUnit
  const activeNewUnit = currentUnit ? currentUnit.newUnit : quote.newUnit
  const activeImages = currentUnit ? currentUnit.images : quote.images

  const oldUnitCode = activeAdapterName.split(' to ')[0]
  const newUnitCode = activeAdapterName.split(' to ')[1]

  const imageSlots = [
    { key: 'oldUnit', label: 'Old Unit', src: activeImages?.oldUnit },
    { key: 'adapter', label: 'Curb Adapter', src: activeImages?.adapter },
    { key: 'newUnit', label: 'New Unit', src: activeImages?.newUnit },
  ]

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <SidebarToggle />
        <FileText size={15} className="text-gray-400" />
        <span
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => navigate('/quotes')}
        >
          Quotes
        </span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">{quote.id}</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/quotes')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            {!quote.payment && (
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                <ExternalLink size={14} />
                Continue on Vibrex
              </button>
            )}
            <button className="p-2.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-bold text-indigo-600">{quote.id}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{quote.projectName}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-gray-400" />
                  {quote.contact}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Package size={14} className="text-gray-400" />
                  {quote.customer}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-400" />
                  {formatDate(quote.configDate)}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 ml-6">
              <p className="text-xs text-gray-400 mb-1">Total Price</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(quote.totalPrice)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{quote.quantity} unit{quote.quantity !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Status Stepper */}
          {quote.workflow && (() => {
            const allDone = quote.workflow.currentStep >= quote.workflow.steps.length
            const activeIdx = selectedStep ?? Math.min(quote.workflow.currentStep, quote.workflow.steps.length - 1)
            const activeStep = quote.workflow.steps[activeIdx]
            const activeIsCompleted = activeStep.completedAt !== null
            const activeIsCurrent = activeIdx === quote.workflow.currentStep && !activeIsCompleted
            const activeIsAllComplete = allDone && activeIdx === quote.workflow.steps.length - 1 && activeStep.completedAt

            return (
              <div className="border-t border-gray-200 pt-5 mt-5">
                {/* Step circles */}
                <div className="flex items-start mb-4">
                  {quote.workflow.steps.map((step, i) => {
                    const isCompleted = step.completedAt !== null
                    const isCurrent = i === quote.workflow.currentStep && !isCompleted
                    const isLast = i === quote.workflow.steps.length - 1
                    const isAllComplete = allDone && isLast && step.completedAt
                    const isSelected = activeIdx === i

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center relative">
                        {/* Connector line */}
                        {i < quote.workflow.steps.length - 1 && (
                          <div
                            className={`absolute top-4 left-[calc(50%+16px)] right-[calc(-50%+16px)] h-0.5 ${
                              isCompleted ? 'bg-indigo-500' : 'border-t-2 border-dashed border-gray-300'
                            }`}
                          />
                        )}

                        <button
                          onClick={() => setSelectedStep(i)}
                          className="flex flex-col items-center cursor-pointer group"
                          aria-label={`View details for ${step.name}`}
                        >
                          {/* Circle */}
                          <div className={`relative z-10 mb-2.5 transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                            {isAllComplete ? (
                              <div className={`w-8 h-8 rounded-full bg-green-500 flex items-center justify-center transition-shadow ${isSelected ? 'ring-2 ring-green-200' : 'ring-2 ring-transparent group-hover:ring-green-200'}`}>
                                <Check size={16} className="text-white" strokeWidth={3} />
                              </div>
                            ) : isCompleted ? (
                              <div className={`w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center transition-shadow ${isSelected ? 'ring-2 ring-indigo-200' : 'ring-2 ring-transparent group-hover:ring-indigo-200'}`}>
                                <Check size={16} className="text-white" strokeWidth={3} />
                              </div>
                            ) : isCurrent ? (
                              <div className={`w-8 h-8 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center transition-shadow ${isSelected ? 'ring-2 ring-indigo-100' : 'ring-2 ring-transparent group-hover:ring-indigo-100'}`}>
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                              </div>
                            ) : (
                              <div className={`w-8 h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center transition-shadow ${isSelected ? 'ring-2 ring-gray-200' : 'ring-2 ring-transparent group-hover:ring-gray-100'}`}>
                                <span className="text-xs font-semibold text-gray-400">{i + 1}</span>
                              </div>
                            )}
                          </div>

                          {/* Label */}
                          <p className={`text-xs font-medium text-center leading-tight ${
                            isCompleted || isAllComplete
                              ? 'text-gray-900'
                              : isCurrent
                                ? 'text-indigo-600 font-semibold'
                                : 'text-gray-400'
                          }`}>
                            {step.name}
                          </p>

                          {/* Date */}
                          {step.completedAt && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {formatDate(step.completedAt)}
                            </p>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Detail panel */}
                <div className={`rounded-lg p-4 ${
                  activeIsAllComplete
                    ? 'bg-green-50 border border-green-200'
                    : activeIsCompleted
                      ? 'bg-indigo-50 border border-indigo-200'
                      : activeIsCurrent
                        ? 'bg-indigo-50/50 border border-indigo-100'
                        : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold mb-1 ${
                        activeIsAllComplete ? 'text-green-700' : activeIsCompleted || activeIsCurrent ? 'text-indigo-700' : 'text-gray-600'
                      }`}>
                        {activeStep.name}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {activeStep.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 text-xs text-gray-500">
                      {activeStep.actor && (
                        <span className="flex items-center gap-1.5">
                          <Users size={12} className="text-gray-400" />
                          {activeStep.actor}
                        </span>
                      )}
                      {activeStep.completedAt && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gray-400" />
                          {formatDate(activeStep.completedAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Payment details inside the Payment step panel */}
                  {activeStep.name === 'Payment' && quote.payment && (
                    <div className="mt-3 pt-3 border-t border-green-200/60 flex items-center gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                          <CreditCard size={13} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{quote.payment.method}</p>
                        </div>
                      </div>
                      {quote.payment.orderNo && (
                        <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-1.5">
                          <p className="text-xs text-gray-500">Order No.</p>
                          <p className="text-sm font-bold text-gray-900">{quote.payment.orderNo}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>

        {/* Unit Tabs */}
        {hasUnits && (
          <div className="relative flex items-center gap-1.5 mb-4">
            {canScrollLeft && (
              <button
                onClick={() => scrollTabs(-1)}
                className="shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm"
                aria-label="Scroll tabs left"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            <div
              ref={tabsRef}
              className="flex-1 flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1.5 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {quote.units.map((unit, i) => (
                <button
                  key={i}
                  onClick={() => setActiveUnit(i)}
                  className={`shrink-0 min-w-[150px] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeUnit === i
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="block text-xs opacity-70 mb-0.5">Curb Adapter {i + 1}</span>
                  <span className="block whitespace-nowrap">{unit.adapterName}</span>
                </button>
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={() => scrollTabs(1)}
                className="shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm"
                aria-label="Scroll tabs right"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* Curb Adapter — Hero Card */}
        <div className="bg-white rounded-xl border border-gray-200 mb-5 overflow-hidden">
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Curb Adapter {hasUnits ? activeUnit + 1 : ''}
              </h2>
              {currentUnit?.unitPrice != null && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3.5 py-2">
                  <DollarSign size={14} className="text-green-600" />
                  <div>
                    <p className="text-[10px] text-green-600 font-medium leading-none mb-0.5">Adapter Price</p>
                    <p className="text-sm font-bold text-green-700 leading-none">{formatCurrency(currentUnit.unitPrice)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Old Unit → New Unit transition */}
            <div className="flex items-stretch gap-4">
              {/* Old Unit */}
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Old Unit (Bottom)</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight mb-3">{oldUnitCode}</p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Model</p>
                  <p className="text-sm font-semibold text-gray-900">{activeOldUnit?.model}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Sizes: {activeOldUnit?.sizes}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="shrink-0 flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <ArrowRight size={18} className="text-indigo-600" />
                </div>
              </div>

              {/* New Unit */}
              <div className="flex-1 bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider mb-1">New Unit (Top)</p>
                <p className="text-2xl font-bold text-indigo-700 tracking-tight mb-3">{newUnitCode}</p>
                <div className="border-t border-indigo-200 pt-3">
                  <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-1">Model</p>
                  <p className="text-sm font-semibold text-indigo-900">{activeNewUnit?.model}</p>
                  <p className="text-xs text-indigo-600 mt-0.5">Sizes: {activeNewUnit?.sizes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Row */}
          <div className="border-t border-gray-200 px-6 py-5">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Photos</h3>
            <div className="grid grid-cols-3 gap-4">
              {imageSlots.map((slot) => (
                <button
                  key={slot.key}
                  onClick={() => slot.src && setLightboxImage(slot)}
                  className={`group relative rounded-xl border-2 border-dashed overflow-hidden transition-colors ${
                    slot.src
                      ? 'border-gray-200 cursor-pointer hover:border-indigo-300'
                      : 'border-gray-200 cursor-default'
                  }`}
                >
                  <div className="aspect-[16/10] relative">
                    <HvacImage
                      src={slot.src}
                      alt={slot.label}
                      className="w-full h-full object-cover"
                    />
                    {slot.src && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
                          View Photo
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-2.5 bg-white border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 text-center">{slot.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping & Submittals — side by side */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Shipping */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Shipping</h3>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Truck size={16} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{quote.shipping?.method}</p>
                {quote.shipping?.carrier && (
                  <p className="text-xs text-gray-500">{quote.shipping.carrier}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submittals */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Submittals</h3>
            <div className="space-y-2">
              {(quote.submittals || []).map((doc, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <FileDown size={15} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc}</p>
                    <p className="text-[10px] text-gray-400">PDF</p>
                  </div>
                  <Download size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Customer */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">360 Contact</h3>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                <Users size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{quote.contact}</p>
                <p className="text-xs text-gray-500">Sales Representative</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">360 Customer</h3>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                <Package size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{quote.customer}</p>
                <p className="text-xs text-gray-500">Created {formatDate(quote.createdDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Item Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Item Summary</h3>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th scope="col" className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                  Description
                </th>
                <th scope="col" className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                  Qty
                </th>
                <th scope="col" className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                  Unit Price
                </th>
                <th scope="col" className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Curb adapter rows — one per unit */}
              {hasUnits && quote.units.map((unit, i) => (
                <tr key={`unit-${i}`} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">
                    Curb Adapter {i + 1} — {unit.adapterName}
                  </td>
                  <td className="py-3 text-sm text-gray-500 text-right">1</td>
                  <td className="py-3 text-sm text-gray-500 text-right">{formatCurrency(unit.unitPrice)}</td>
                  <td className="py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(unit.unitPrice)}</td>
                </tr>
              ))}

              {/* Standard line items */}
              {quote.lineItems.map((item, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-sm text-gray-900">{item.description}</td>
                  <td className="py-3 text-sm text-gray-500 text-right">{item.qty}</td>
                  <td className="py-3 text-sm text-gray-500 text-right">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="py-3 text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200">
                <td colSpan={3} className="pt-3 text-sm font-bold text-gray-900 text-right">
                  Total
                </td>
                <td className="pt-3 text-sm font-bold text-gray-900 text-right">
                  {formatCurrency(quote.totalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-label="Image viewer"
        >
          <div
            className="relative max-w-4xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10"
              aria-label="Close image viewer"
            >
              <X size={16} />
            </button>
            <HvacImage
              src={lightboxImage.src}
              alt={lightboxImage.label}
              className="rounded-xl shadow-2xl max-h-[85vh] object-contain w-[600px] max-w-full"
            />
            <p className="text-center text-sm font-medium text-white mt-3">{lightboxImage.label}</p>
          </div>
        </div>
      )}
    </main>
  )
}
