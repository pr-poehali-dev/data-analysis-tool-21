import { useState } from "react"

const docs = [
  {
    id: 1,
    title: "Благодарственное письмо",
    org: "ТРЦ «Коллаж»",
    rotate: "-3deg",
    url: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/bucket/d3a768eb-520d-4a9e-92d0-650136282293.png",
  },
  {
    id: 2,
    title: "Удостоверение",
    org: "Повышение квалификации",
    rotate: "2deg",
    url: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/bucket/b57af2e9-b651-496f-9ebd-f1a40cb6e8e6.png",
  },
  {
    id: 3,
    title: "Удостоверение",
    org: "Инструктор первой помощи",
    rotate: "-1.5deg",
    url: "https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/bucket/553503b7-2a3f-4fbf-93ab-c3ecf16ac0ad.png",
  },
]

export function Certificates() {
  const [zoomed, setZoomed] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Доверие</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-4 text-balance lg:text-7xl">
            Документы и награды
          </h2>
          <p className="text-muted-foreground text-lg">Нажмите на документ, чтобы рассмотреть подробнее</p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
          {docs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setZoomed(doc.id)}
              className="group cursor-pointer flex-shrink-0"
              style={{ transform: `rotate(${doc.rotate})`, transition: "transform 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) scale(1.04)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = `rotate(${doc.rotate}) scale(1)`
              }}
            >
              <div className="w-52 md:w-64 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={doc.url}
                    alt={doc.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <p className="font-semibold text-sm text-foreground">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{doc.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {zoomed !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={docs.find((d) => d.id === zoomed)?.url}
              alt="Документ"
              className="w-full h-auto"
            />
            <button
              onClick={() => setZoomed(null)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
