'use client'

type Props = {
  className?: string
  heightClass?: string
}

export function GoogleMapsEmbed({ className = '', heightClass = 'h-96' }: Props) {
  const query = encodeURIComponent('Local City Solutions, As Saadah, Riyadh 14257, Saudi Arabia')
  const src = `https://maps.google.com/maps?q=${query}&output=embed`

  return (
    <div className={`w-full overflow-hidden rounded-xl ${heightClass} ${className}`}>
      <iframe
        src={src}
        title="Local City Solutions — Office Location in Riyadh"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
