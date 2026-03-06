import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ShoppingCart,
  MoreVertical,
  Users,
  Package,
  Calendar,
  ArrowRight,
  Truck,
  CreditCard,
  Check,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
  Download,
  FileDown,
} from 'lucide-react'
import { orders } from '../data/orders'
import HvacImage from './shared/HvacImage'
import SidebarToggle from './shared/SidebarToggle'

export default function OrderDetailContent() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === orderId)
  const [selectedStep, setSelectedStep] = useState(null)
  const [expandedAdapter, setExpandedAdapter] = useState(null)
  const [adapterSectionOpen, setAdapterSectionOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  const hasUnits = order?.units && order.units.length > 1

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

  if (!order) {
    return (
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80 flex items-center justify-center">
        <p className="text-gray-500">Order not found.</p>
      </main>
    )
  }

  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Top breadcrumb bar */}
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <SidebarToggle />
        <ShoppingCart size={15} className="text-gray-400" />
        <span
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => navigate('/orders')}
        >
          Orders
        </span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">{order.id}</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button className="p-2.5 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Header Row — compact info bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5 min-w-0">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-indigo-600">{order.id}</span>
                  {order.quoteId && (
                    <span className="text-xs text-gray-400">from {order.quoteId}</span>
                  )}
                </div>
                <h1 className="text-xl font-bold text-gray-900 truncate">{order.projectName}</h1>
              </div>
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Users size={13} className="text-gray-400" />
                  {order.contact}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Package size={13} className="text-gray-400" />
                  {order.customer}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gray-400" />
                  {formatDate(order.orderDate)}
                </span>
              </div>
              <div className="border-l border-gray-200 pl-6 text-right">
                <p className="text-xl font-bold text-gray-900">{formatCurrency(order.totalPrice)}</p>
                <p className="text-xs text-gray-400">{order.quantity} unit{order.quantity !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress — prominent standalone card */}
        {order.workflow && (() => {
          const allDone = order.workflow.currentStep >= order.workflow.steps.length
          const activeIdx = selectedStep ?? Math.min(order.workflow.currentStep, order.workflow.steps.length - 1)
          const activeStep = order.workflow.steps[activeIdx]
          const activeIsCompleted = activeStep.completedAt !== null
          const activeIsCurrent = activeIdx === order.workflow.currentStep && !activeIsCompleted
          const activeIsAllComplete = allDone && activeIdx === order.workflow.steps.length - 1 && activeStep.completedAt

          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
              <h2 className="text-sm font-bold text-gray-900 mb-5">Order Progress</h2>

              {/* Step circles */}
              <div className="flex items-start mb-5">
                {order.workflow.steps.map((step, i) => {
                  const isCompleted = step.completedAt !== null
                  const isCurrent = i === order.workflow.currentStep && !isCompleted
                  const isLast = i === order.workflow.steps.length - 1
                  const isAllComplete = allDone && isLast && step.completedAt
                  const isSelected = activeIdx === i

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center relative">
                      {/* Connector line */}
                      {i < order.workflow.steps.length - 1 && (
                        <div
                          className={`absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 ${
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
                        <div className={`relative z-10 mb-3 transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                          {isAllComplete ? (
                            <div className={`w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transition-shadow ${isSelected ? 'ring-3 ring-green-200' : 'ring-2 ring-transparent group-hover:ring-green-200'}`}>
                              <Check size={18} className="text-white" strokeWidth={3} />
                            </div>
                          ) : isCompleted ? (
                            <div className={`w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center transition-shadow ${isSelected ? 'ring-3 ring-indigo-200' : 'ring-2 ring-transparent group-hover:ring-indigo-200'}`}>
                              <Check size={18} className="text-white" strokeWidth={3} />
                            </div>
                          ) : isCurrent ? (
                            <div className={`w-10 h-10 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center transition-shadow ${isSelected ? 'ring-3 ring-indigo-100' : 'ring-2 ring-transparent group-hover:ring-indigo-100'}`}>
                              <div className="w-3 h-3 rounded-full bg-indigo-600" />
                            </div>
                          ) : (
                            <div className={`w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center transition-shadow ${isSelected ? 'ring-3 ring-gray-200' : 'ring-2 ring-transparent group-hover:ring-gray-100'}`}>
                              <span className="text-sm font-semibold text-gray-400">{i + 1}</span>
                            </div>
                          )}
                        </div>

                        {/* Label */}
                        <p className={`text-sm font-medium text-center leading-tight ${
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
                          <p className="text-[11px] text-gray-400 mt-1">
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
              </div>
            </div>
          )
        })()}

        {/* Two-column layout: Order Flow (left) | Reference Details (right) */}
        <div className="grid grid-cols-5 gap-5">
          {/* Left column — order flow */}
          <div className="col-span-3 space-y-5">
            {/* Shipping & Payment */}
            <div className="grid grid-cols-2 gap-4">
              {/* Shipping */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Shipping</h3>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Truck size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{order.shipping?.method}</p>
                    {order.shipping?.carrier && (
                      <p className="text-xs text-gray-500">{order.shipping.carrier}</p>
                    )}
                  </div>
                </div>
                {order.shipping?.trackingNumber && (
                  <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2 mt-3">
                    <MapPin size={14} className="text-indigo-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-indigo-600 font-medium leading-none mb-0.5">Tracking #</p>
                      <p className="text-sm font-bold text-indigo-700 leading-none truncate">{order.shipping.trackingNumber}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Payment Details</h3>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <CreditCard size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{order.payment?.method}</p>
                    {order.payment?.paidAt && (
                      <p className="text-xs text-gray-500">Paid {formatDate(order.payment.paidAt)}</p>
                    )}
                  </div>
                </div>
                {order.payment?.orderNo && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3.5 py-2.5 mt-3">
                    <p className="text-xs text-gray-500">Order No.</p>
                    <p className="text-sm font-bold text-gray-900">{order.payment.orderNo}</p>
                  </div>
                )}
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
                  {hasUnits && order.units.map((unit, i) => (
                    <tr key={`unit-${i}`} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-900">
                        Curb Adapter {i + 1} — {unit.adapterName}
                      </td>
                      <td className="py-3 text-sm text-gray-500 text-right">1</td>
                      <td className="py-3 text-sm text-gray-500 text-right">{formatCurrency(unit.unitPrice)}</td>
                      <td className="py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(unit.unitPrice)}</td>
                    </tr>
                  ))}

                  {order.lineItems.map((item, i) => (
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
                      {formatCurrency(order.totalPrice)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Right column — unified reference panel */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

              {/* Curb Adapter Details */}
              <div className="p-5">
                {hasUnits ? (
                  <>
                    {/* Collapsible header */}
                    <button
                      onClick={() => {
                        setAdapterSectionOpen(!adapterSectionOpen)
                        if (adapterSectionOpen) setExpandedAdapter(null)
                      }}
                      className="w-full flex items-center justify-between mb-1 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          Curb Adapters
                        </h3>
                        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {order.units.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                        <span>{adapterSectionOpen ? 'Hide' : 'Show'}</span>
                        {adapterSectionOpen ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </div>
                    </button>

                    {/* Collapsed summary */}
                    {!adapterSectionOpen && (
                      <p className="text-xs text-gray-500 mt-1">
                        {order.units.map(u => u.adapterName).slice(0, 3).join(', ')}
                        {order.units.length > 3 && ` +${order.units.length - 3} more`}
                      </p>
                    )}

                    {/* Expanded scrollable list */}
                    {adapterSectionOpen && (
                      <div className="mt-3 space-y-2 max-h-[320px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                        {order.units.map((unit, i) => {
                          const isExpanded = expandedAdapter === i
                          return (
                            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => setExpandedAdapter(isExpanded ? null : i)}
                                className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-50 transition-colors text-left"
                              >
                                <span className="text-[10px] font-bold text-gray-400 shrink-0">#{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">{unit.adapterName}</p>
                                </div>
                                <span className="text-xs font-bold text-gray-700 shrink-0">{formatCurrency(unit.unitPrice)}</span>
                                {isExpanded ? (
                                  <ChevronUp size={14} className="text-gray-400 shrink-0" />
                                ) : (
                                  <ChevronDown size={14} className="text-gray-400 shrink-0" />
                                )}
                              </button>
                              {isExpanded && (
                                <div className="px-3.5 pb-3 border-t border-gray-100">
                                  <div className="grid grid-cols-2 gap-2.5 pt-3">
                                    <div className="bg-gray-50 rounded-lg p-2.5">
                                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Old Unit</p>
                                      <p className="text-sm font-semibold text-gray-900">{unit.oldUnit.model}</p>
                                      <p className="text-xs text-gray-500 mt-0.5">Sizes: {unit.oldUnit.sizes}</p>
                                    </div>
                                    <div className="bg-indigo-50 rounded-lg p-2.5">
                                      <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider mb-1">New Unit</p>
                                      <p className="text-sm font-semibold text-indigo-900">{unit.newUnit.model}</p>
                                      <p className="text-xs text-indigo-600 mt-0.5">Sizes: {unit.newUnit.sizes}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Curb Adapter
                    </h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedAdapter(expandedAdapter === 0 ? null : 0)}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{order.adapterName}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.oldUnit.model} <ArrowRight size={10} className="inline text-gray-400 mx-0.5" /> {order.newUnit.model}
                          </p>
                        </div>
                        {expandedAdapter === 0 ? (
                          <ChevronUp size={14} className="text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown size={14} className="text-gray-400 shrink-0" />
                        )}
                      </button>
                      {expandedAdapter === 0 && (
                        <div className="px-3.5 pb-3 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-2.5 pt-3">
                            <div className="bg-gray-50 rounded-lg p-2.5">
                              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Old Unit</p>
                              <p className="text-sm font-semibold text-gray-900">{order.oldUnit.model}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Sizes: {order.oldUnit.sizes}</p>
                            </div>
                            <div className="bg-indigo-50 rounded-lg p-2.5">
                              <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider mb-1">New Unit</p>
                              <p className="text-sm font-semibold text-indigo-900">{order.newUnit.model}</p>
                              <p className="text-xs text-indigo-600 mt-0.5">Sizes: {order.newUnit.sizes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Photos */}
              {(() => {
                const activeImages = hasUnits && expandedAdapter !== null
                  ? order.units[expandedAdapter]?.images
                  : order.images
                const photoLabel = hasUnits && expandedAdapter !== null
                  ? `Photos — Adapter #${expandedAdapter + 1}`
                  : 'Photos'

                return (
              <div className="border-t border-gray-200 p-5">
                <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">{photoLabel}</h3>
                {hasUnits && expandedAdapter === null && (
                  <p className="text-xs text-gray-400 mb-3 -mt-1">Expand a curb adapter above to see its photos</p>
                )}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'oldUnit', label: 'Old Unit', src: activeImages?.oldUnit },
                    { key: 'adapter', label: 'Adapter', src: activeImages?.adapter },
                    { key: 'newUnit', label: 'New Unit', src: activeImages?.newUnit },
                  ].map((slot) => (
                    <button
                      key={slot.key}
                      onClick={() => slot.src && setLightboxImage(slot)}
                      className={`group rounded-lg border overflow-hidden transition-colors ${
                        slot.src
                          ? 'border-gray-200 cursor-pointer hover:border-indigo-300'
                          : 'border-dashed border-gray-200 cursor-default'
                      }`}
                    >
                      <div className="aspect-square relative">
                        <HvacImage
                          src={slot.src}
                          alt={slot.label}
                          className="w-full h-full object-cover"
                        />
                        {slot.src && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        )}
                      </div>
                      <p className="text-[10px] font-medium text-gray-500 text-center py-1.5 border-t border-gray-100">{slot.label}</p>
                    </button>
                  ))}
                </div>
              </div>
                )
              })()}

              {/* Submittals */}
              {order.submittals && order.submittals.length > 0 && (
                <div className="border-t border-gray-200 p-5">
                  <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Submittals</h3>
                  <div className="space-y-1.5">
                    {order.submittals.map((doc, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center shrink-0">
                          <FileDown size={13} className="text-red-500" />
                        </div>
                        <p className="flex-1 text-sm text-gray-700 truncate min-w-0">{doc}</p>
                        <Download size={12} className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact & Customer */}
              <div className="border-t border-gray-200 p-5">
                <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">People</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <Users size={15} className="text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{order.contact}</p>
                      <p className="text-[11px] text-gray-400">360 Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Package size={15} className="text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{order.customer}</p>
                      <p className="text-[11px] text-gray-400">360 Customer</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
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
