import { Star, Trash2, ChevronDown } from 'lucide-react'
import { PHONE_TYPE_LABELS } from '../../constants/phoneTypes'

export default function PhoneRow({ phone, onUpdate, onDelete, onTogglePrimary, typeOptions, readOnly }) {
  if (readOnly) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-28 shrink-0 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
          {PHONE_TYPE_LABELS[phone.type] || phone.type}
        </span>
        <span className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
          {phone.number}
        </span>
        {phone.primary && (
          <span className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
            <Star size={16} fill="currentColor" />
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-28 shrink-0">
        <select
          value={phone.type}
          onChange={(e) => onUpdate({ ...phone, type: e.target.value })}
          className="w-full appearance-none px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors bg-white"
        >
          {typeOptions.map((t) => (
            <option key={t} value={t}>{PHONE_TYPE_LABELS[t] || t}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      <input
        type="text"
        value={phone.number}
        onChange={(e) => onUpdate({ ...phone, number: e.target.value })}
        placeholder="(555) 555-5555"
        className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={onTogglePrimary}
        className={`p-2 rounded-lg transition-colors shrink-0 ${
          phone.primary
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }`}
      >
        <Star size={16} fill={phone.primary ? 'currentColor' : 'none'} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors shrink-0"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
