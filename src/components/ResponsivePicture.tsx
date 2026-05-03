import { responsiveSources } from '../lib/responsiveImage'

type Props = {
  src: string
  alt: string
  className?: string
  sizes: string
  width: number
  height: number
  loading?: 'eager' | 'lazy'
  decoding?: 'async' | 'auto' | 'sync'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function ResponsivePicture({
  src,
  alt,
  className = '',
  sizes,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
}: Props) {
  const { webp640, webp1280, fallback } = responsiveSources(src)

  return (
    <picture className="block h-full w-full">
      <source type="image/webp" srcSet={`${webp640} 640w, ${webp1280} 1280w`} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        {...(fetchPriority ? { fetchPriority } : {})}
        className={className}
      />
    </picture>
  )
}
