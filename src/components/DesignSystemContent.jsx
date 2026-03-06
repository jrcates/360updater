import {
  Palette,
  Plus,
  Pencil,
  Trash2,
  Star,
  Search,
  MoreVertical,
  ArrowRight,
} from 'lucide-react'
import SidebarToggle from './shared/SidebarToggle'

const brandColors = [
  { name: 'Indigo 900', class: 'bg-indigo-900', hex: '#312e81', text: 'text-white' },
  { name: 'Indigo 800', class: 'bg-indigo-800', hex: '#3730a3', text: 'text-white' },
  { name: 'Indigo 700', class: 'bg-indigo-700', hex: '#4338ca', text: 'text-white' },
  { name: 'Indigo 600', class: 'bg-indigo-600', hex: '#4f46e5', text: 'text-white' },
  { name: 'Red 600', class: 'bg-red-600', hex: '#dc2626', text: 'text-white' },
  { name: 'Red 500', class: 'bg-red-500', hex: '#ef4444', text: 'text-white' },
]

const semanticColors = [
  { name: 'Success', class: 'bg-green-500', hex: '#22c55e', text: 'text-white' },
  { name: 'Success Light', class: 'bg-green-50', hex: '#f0fdf4', text: 'text-green-700', border: true },
  { name: 'Warning', class: 'bg-orange-400', hex: '#fb923c', text: 'text-white' },
  { name: 'Warning Light', class: 'bg-orange-50', hex: '#fff7ed', text: 'text-orange-700', border: true },
  { name: 'Danger', class: 'bg-red-500', hex: '#ef4444', text: 'text-white' },
  { name: 'Danger Light', class: 'bg-red-50', hex: '#fef2f2', text: 'text-red-700', border: true },
  { name: 'Info', class: 'bg-blue-500', hex: '#3b82f6', text: 'text-white' },
  { name: 'Info Light', class: 'bg-blue-50', hex: '#eff6ff', text: 'text-blue-700', border: true },
]

const neutralColors = [
  { name: 'Gray 900', class: 'bg-gray-900', hex: '#111827', text: 'text-white' },
  { name: 'Gray 700', class: 'bg-gray-700', hex: '#374151', text: 'text-white' },
  { name: 'Gray 500', class: 'bg-gray-500', hex: '#6b7280', text: 'text-white' },
  { name: 'Gray 400', class: 'bg-gray-400', hex: '#9ca3af', text: 'text-white' },
  { name: 'Gray 200', class: 'bg-gray-200', hex: '#e5e7eb', text: 'text-gray-700' },
  { name: 'Gray 100', class: 'bg-gray-100', hex: '#f3f4f6', text: 'text-gray-700', border: true },
  { name: 'Gray 50', class: 'bg-gray-50', hex: '#f9fafb', text: 'text-gray-700', border: true },
  { name: 'White', class: 'bg-white', hex: '#ffffff', text: 'text-gray-700', border: true },
]

const typeSizes = [
  { name: 'text-2xl', size: 'text-2xl', example: 'Page Title' },
  { name: 'text-xl', size: 'text-xl', example: 'Section Heading' },
  { name: 'text-lg', size: 'text-lg', example: 'Card Heading' },
  { name: 'text-base', size: 'text-base', example: 'Body Text' },
  { name: 'text-sm', size: 'text-sm', example: 'Secondary Text' },
  { name: 'text-xs', size: 'text-xs', example: 'Small Label' },
  { name: 'text-[11px]', size: 'text-[11px]', example: 'Micro Text' },
  { name: 'text-[10px]', size: 'text-[10px]', example: 'Badge Text' },
]

const fontWeights = [
  { name: 'Light', weight: 'font-light', value: '300' },
  { name: 'Regular', weight: 'font-normal', value: '400' },
  { name: 'Medium', weight: 'font-medium', value: '500' },
  { name: 'Semibold', weight: 'font-semibold', value: '600' },
  { name: 'Bold', weight: 'font-bold', value: '700' },
]

const spacingScale = [
  { name: '1', value: '0.25rem / 4px', class: 'w-1' },
  { name: '2', value: '0.5rem / 8px', class: 'w-2' },
  { name: '3', value: '0.75rem / 12px', class: 'w-3' },
  { name: '4', value: '1rem / 16px', class: 'w-4' },
  { name: '5', value: '1.25rem / 20px', class: 'w-5' },
  { name: '6', value: '1.5rem / 24px', class: 'w-6' },
  { name: '8', value: '2rem / 32px', class: 'w-8' },
  { name: '10', value: '2.5rem / 40px', class: 'w-10' },
  { name: '12', value: '3rem / 48px', class: 'w-12' },
  { name: '16', value: '4rem / 64px', class: 'w-16' },
]

const radiusScale = [
  { name: 'rounded-md', class: 'rounded-md', desc: '6px' },
  { name: 'rounded-lg', class: 'rounded-lg', desc: '8px' },
  { name: 'rounded-xl', class: 'rounded-xl', desc: '12px' },
  { name: 'rounded-2xl', class: 'rounded-2xl', desc: '16px' },
  { name: 'rounded-full', class: 'rounded-full', desc: '9999px' },
]

const shadowScale = [
  { name: 'shadow-sm', class: 'shadow-sm' },
  { name: 'shadow', class: 'shadow' },
  { name: 'shadow-md', class: 'shadow-md' },
  { name: 'shadow-lg', class: 'shadow-lg' },
  { name: 'shadow-xl', class: 'shadow-xl' },
]

function ColorSwatch({ name, colorClass, hex, textClass, border }) {
  return (
    <div className="flex flex-col">
      <div
        className={`h-16 rounded-lg ${colorClass} ${border ? 'border border-gray-200' : ''} flex items-end p-2`}
      >
        <span className={`text-[10px] font-semibold ${textClass}`}>{hex}</span>
      </div>
      <p className="text-xs font-medium text-gray-900 mt-1.5">{name}</p>
      <p className="text-[10px] text-gray-400">{colorClass.replace('bg-', '')}</p>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-bold text-gray-900 mb-1">{children}</h2>
  )
}

function SectionDesc({ children }) {
  return <p className="text-sm text-gray-500 mb-5">{children}</p>
}

export default function DesignSystemContent() {
  return (
    <main className="flex-1 min-w-0 overflow-auto bg-gray-50/80">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <SidebarToggle />
        <Palette size={15} className="text-gray-400" />
        <span className="font-medium text-gray-700">Design System</span>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Design System</h1>
          <p className="text-sm text-gray-500 mt-1">
            Visual language and component patterns for 360 Sheet Metal Products.
          </p>
        </div>

        {/* Color Palette - Brand */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Brand Colors</SectionTitle>
          <SectionDesc>Primary brand colors derived from the 360 Sheet Metal Products logo.</SectionDesc>
          <div className="grid grid-cols-6 gap-4">
            {brandColors.map((c) => (
              <ColorSwatch
                key={c.name}
                name={c.name}
                colorClass={c.class}
                hex={c.hex}
                textClass={c.text}
              />
            ))}
          </div>
        </section>

        {/* Color Palette - Semantic */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Semantic Colors</SectionTitle>
          <SectionDesc>Status and feedback colors used across the application.</SectionDesc>
          <div className="grid grid-cols-8 gap-4">
            {semanticColors.map((c) => (
              <ColorSwatch
                key={c.name}
                name={c.name}
                colorClass={c.class}
                hex={c.hex}
                textClass={c.text}
                border={c.border}
              />
            ))}
          </div>
        </section>

        {/* Color Palette - Neutrals */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Neutral Colors</SectionTitle>
          <SectionDesc>Grays used for text, backgrounds, borders, and surfaces.</SectionDesc>
          <div className="grid grid-cols-8 gap-4">
            {neutralColors.map((c) => (
              <ColorSwatch
                key={c.name}
                name={c.name}
                colorClass={c.class}
                hex={c.hex}
                textClass={c.text}
                border={c.border}
              />
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Typography</SectionTitle>
          <SectionDesc>
            Montserrat is used as the sole typeface across all text elements.
          </SectionDesc>

          {/* Font Family */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Font Family</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-2xl font-bold text-gray-900">Montserrat</p>
              <p className="text-sm text-gray-500 mt-1">Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)</p>
            </div>
          </div>

          {/* Font Weights */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Font Weights</p>
            <div className="space-y-3">
              {fontWeights.map((w) => (
                <div key={w.value} className="flex items-baseline gap-4">
                  <span className="text-xs text-gray-400 w-20 shrink-0">{w.value}</span>
                  <span className={`text-lg text-gray-900 ${w.weight}`}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Type Scale */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Type Scale</p>
            <div className="space-y-4">
              {typeSizes.map((t) => (
                <div key={t.name} className="flex items-baseline gap-4 border-b border-gray-100 pb-3">
                  <span className="text-xs text-gray-400 w-24 shrink-0 font-mono">{t.name}</span>
                  <span className={`${t.size} font-semibold text-gray-900`}>{t.example}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Spacing Scale</SectionTitle>
          <SectionDesc>Consistent spacing values used for padding, margin, and gaps.</SectionDesc>
          <div className="space-y-3">
            {spacingScale.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="text-xs text-gray-400 w-8 shrink-0 font-mono text-right">{s.name}</span>
                <div className={`h-6 ${s.class} bg-indigo-600 rounded`} />
                <span className="text-xs text-gray-500">{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Border Radius</SectionTitle>
          <SectionDesc>Corner rounding used across cards, buttons, inputs, and avatars.</SectionDesc>
          <div className="flex items-end gap-6">
            {radiusScale.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-indigo-600 ${r.class}`} />
                <p className="text-xs font-medium text-gray-900">{r.name}</p>
                <p className="text-[10px] text-gray-400">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Shadows</SectionTitle>
          <SectionDesc>Elevation levels used for cards, modals, and hover effects.</SectionDesc>
          <div className="flex items-end gap-6">
            {shadowScale.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div className={`w-20 h-20 bg-white border border-gray-100 rounded-xl ${s.class}`} />
                <p className="text-xs font-medium text-gray-900">{s.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Buttons</SectionTitle>
          <SectionDesc>Button styles used across the application.</SectionDesc>

          <div className="space-y-6">
            {/* Primary Buttons */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Primary</p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Plus size={16} />
                  New Contact
                </button>
                <button className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors">
                  <Plus size={16} />
                  Create Branch
                </button>
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Secondary</p>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Search size={15} />
                  Filters
                </button>
              </div>
            </div>

            {/* Danger Button */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Danger</p>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Icon Buttons</p>
              <div className="flex items-center gap-3">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                  <Pencil size={15} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                  <MoreVertical size={16} />
                </button>
                <button className="p-2 rounded-lg bg-indigo-600 text-white">
                  <Star size={16} fill="currentColor" />
                </button>
                <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                  <Star size={16} />
                </button>
                <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Disabled</p>
              <div className="flex items-center gap-3">
                <button disabled className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  Save Changes
                </button>
                <button disabled className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges & Tags */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Badges &amp; Tags</SectionTitle>
          <SectionDesc>Status indicators, tier badges, and labels.</SectionDesc>

          <div className="space-y-6">
            {/* Status Badges */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Status</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded">Active</span>
                <span className="text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded">Current</span>
                <span className="text-[10px] font-semibold bg-orange-400 text-white px-2 py-0.5 rounded">Pending</span>
                <span className="text-[10px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded">Inactive</span>
              </div>
            </div>

            {/* Tier Badges */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tiers</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded">Tier 1</span>
                <span className="text-[10px] font-semibold bg-orange-400 text-white px-2 py-0.5 rounded">Tier 2</span>
                <span className="text-[10px] font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Tier 3</span>
              </div>
            </div>

            {/* Tag Badges */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tags</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700 border border-gray-200 rounded px-3 py-1">CUSTOMER</span>
                <span className="text-xs font-semibold text-gray-700 border border-gray-200 rounded px-3 py-1">VENDOR</span>
                <span className="text-xs font-semibold text-gray-700 border border-gray-200 rounded px-3 py-1">ACTIVE</span>
              </div>
            </div>

            {/* Source Badges */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Source Indicators</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">From Branch</span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5">
                  <Star size={10} fill="currentColor" />
                  Preferred
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Inputs */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Form Inputs</SectionTitle>
          <SectionDesc>Input fields, selects, and textareas used in forms.</SectionDesc>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Text Input</label>
              <input
                type="text"
                placeholder="Placeholder text..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Required Field <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="Filled value"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Search Input</label>
              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-white rounded-lg border border-gray-200">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Read-Only</label>
              <input
                type="text"
                value="Inherited value"
                readOnly
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Cards</SectionTitle>
          <SectionDesc>Card patterns used for content containers.</SectionDesc>

          <div className="grid grid-cols-3 gap-4">
            {/* Standard Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-full bg-indigo-900 text-white text-sm font-bold flex items-center justify-center">
                  AB
                </div>
                <span className="text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded">Active</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-0.5">Card Title</h3>
              <p className="text-xs text-gray-500 mb-3">Subtitle or description</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Detail info</span>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  View
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Stat Card */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <p className="text-xs text-green-700 font-medium mb-1">Success Metric</p>
              <p className="text-2xl font-bold text-green-700">128</p>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </div>

            {/* Gradient Card */}
            <div className="bg-linear-to-br from-indigo-900 to-indigo-700 rounded-xl p-5 text-white">
              <p className="text-xs text-indigo-200 font-medium mb-1">Featured Metric</p>
              <p className="text-2xl font-bold">$45,200</p>
              <p className="text-xs text-indigo-300 mt-1">Total revenue</p>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
          <SectionTitle>Avatars</SectionTitle>
          <SectionDesc>User and contact avatar sizes and color variants.</SectionDesc>

          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-indigo-900 text-white text-sm font-bold flex items-center justify-center">JB</div>
              <span className="text-xs text-gray-400">56px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-indigo-800 text-white text-sm font-bold flex items-center justify-center">RB</div>
              <span className="text-xs text-gray-400">48px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-700 text-white text-xs font-bold flex items-center justify-center">AC</div>
              <span className="text-xs text-gray-400">32px</span>
            </div>
            <div className="w-px h-14 bg-gray-200 mx-2" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-indigo-900 text-white text-sm font-bold flex items-center justify-center">A</div>
              <span className="text-xs text-gray-400">indigo-900</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-indigo-800 text-white text-sm font-bold flex items-center justify-center">B</div>
              <span className="text-xs text-gray-400">indigo-800</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-indigo-700 text-white text-sm font-bold flex items-center justify-center">C</div>
              <span className="text-xs text-gray-400">indigo-700</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-500 text-white text-sm font-bold flex items-center justify-center">D</div>
              <span className="text-xs text-gray-400">gray-500</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
