import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const services = [
  {
    id: 1,
    title: "Поддерживающая уборка",
    tagline: "Стандартный клининг всей квартиры",
    features: [
      "Стандартный клининг всей квартиры",
      "1–2 исполнителя",
      "Удаляются лёгкие загрязнения",
      "Уборка до 1,8 метров",
      "Работа 2–4 часа",
    ],
    accent: false,
  },
  {
    id: 2,
    title: "Поддерживающая уборка ПЛЮС",
    tagline: "Как поддерживающая, но на всю высоту",
    features: [
      "Как поддерживающая уборка, но на всю высоту",
      "1–2 исполнителя",
      "Удаляются лёгкие загрязнения",
      "Клининг на всю высоту",
      "Работа 3–6 часов",
    ],
    accent: true,
  },
  {
    id: 3,
    title: "Мытьё окон",
    tagline: "Чтобы окна сияли чистотой",
    features: [
      "Чтобы окна сияли чистотой",
      "1–2 исполнителя",
      "Моем все окна в квартире: рамы, отливы, подоконники, москитные сетки",
      "Работа 2–5 часов",
    ],
    accent: false,
  },
  {
    id: 4,
    title: "Генеральная уборка",
    tagline: "Удаляем все сложные загрязнения",
    features: [
      "Удаляем все сложные загрязнения",
      "2–4 исполнителя",
      "Удаляются любые загрязнения",
      "Клининг на всю высоту",
      "Работа 6–8 часов",
    ],
    accent: false,
  },
]

export function Projects() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.15 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что мы делаем</p>
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Наши <HighlightedText>услуги</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Выберите подходящий формат уборки — от поддерживающей до генеральной.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${
                service.accent
                  ? "bg-foreground text-primary-foreground"
                  : "bg-white border border-border"
              } p-8 flex flex-col`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${service.accent ? "text-white" : "text-foreground"}`}>
                  {service.title}
                </h3>
                <p className={`text-sm ${service.accent ? "text-white/60" : "text-muted-foreground"}`}>
                  {service.tagline}
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        service.accent ? "text-sky-300" : "text-sky-500"
                      }`}
                      strokeWidth={2.5}
                    />
                    <span className={`text-sm leading-snug ${service.accent ? "text-white/80" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="https://vk.com/kliningkostroma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                    service.accent
                      ? "bg-white text-foreground hover:bg-sky-50"
                      : "bg-foreground text-white hover:bg-foreground/80"
                  }`}
                >
                  Узнать цену
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Узнать цену по фото с точностью 100%
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Пришлите нам фото помещения и комментарий в любой удобный мессенджер, а мы сделаем для вас точный расчёт!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://vk.com/kliningkostroma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#0077FF] text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#0066DD] transition-colors duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.566c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
              </svg>
              ВКонтакте
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
