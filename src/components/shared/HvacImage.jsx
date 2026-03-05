import { Image } from 'lucide-react'
import { HVAC_ILLUSTRATIONS } from './HvacIllustrations'

export default function HvacImage({ src, alt, className = '' }) {
  // SVG illustration identifier (e.g. 'svg:oldUnit' or 'svg:oldUnit:2')
  if (src && src.startsWith('svg:')) {
    const parts = src.split(':')
    const type = parts[1]
    const variant = parts[2] ? parseInt(parts[2], 10) : 1
    const SvgComponent = HVAC_ILLUSTRATIONS[type]
    if (SvgComponent) {
      return <SvgComponent className={className} variant={variant} />
    }
  }

  // Regular URL
  if (src) {
    return <img src={src} alt={alt} className={className} />
  }

  // No image fallback
  return (
    <div className={`${className} flex flex-col items-center justify-center bg-gray-50`}>
      <Image size={24} className="text-gray-300 mb-2" />
      <p className="text-xs text-gray-400">No photo</p>
    </div>
  )
}
