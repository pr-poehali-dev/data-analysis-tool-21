import { useRef, useState, useCallback } from "react"

const pairs = [
  {
    label: "Плита",
    before: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/files/05ea1f43-2bd4-44ee-b4ed-29d405940c73.jpg",
    after: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/files/ea7fc03b-449f-42ac-b664-8126a1dc944f.jpg",
  },
  {
    label: "Ванная",
    before: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/files/6dde9794-e926-4b18-a021-9d1c795fb856.jpg",
    after: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/files/028744a8-f0a0-41a4-aa0d-48cc1d1d8af0.jpg",
  },
  {
    label: "Пол",
    before: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/files/129b66ac-344a-432e-9fce-bb13fe1edf99.jpg",
    after: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/files/7ae5d250-c153-47e8-9f35-6635eb52d459.jpg",
  },
]

function SliderItem({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden cursor-ew-resize select-none"
      style={{ aspectRatio: "1 / 1" }}
      onMouseMove={onMouseMove}
      onMouseUp={() => { isDragging.current = false }}
      onMouseLeave={() => { isDragging.current = false }}
      onTouchMove={onTouchMove}
    >
      <img src={before} alt="До уборки" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={after}
          alt="После уборки"
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
          draggable={false}
        />
      </div>

      <div className="absolute top-4 left-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded-full pointer-events-none">
        После
      </div>
      <div className="absolute top-4 right-4 bg-black/60 text-white text-sm font-medium px-3 py-1 rounded-full pointer-events-none">
        До
      </div>

      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none" style={{ left: `${position}%` }} />

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize z-10"
        style={{ left: `${position}%` }}
        onMouseDown={() => { isDragging.current = true }}
        onTouchStart={(e) => { updatePosition(e.touches[0].clientX) }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 10L2 6M6 10L2 14M6 10H14M14 10L18 6M14 10L18 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export function BeforeAfter() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Результат</p>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight">До и после уборки</h2>
          <p className="text-muted-foreground mt-4 text-lg">Двигайте ползунок, чтобы увидеть разницу</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pairs.map((pair) => (
            <div key={pair.label}>
              <p className="text-center font-medium mb-3 text-foreground">{pair.label}</p>
              <SliderItem before={pair.before} after={pair.after} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
