import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import { SocialButtons } from "./SocialButtons"

const VK_URL = "https://vk.com/kliningkostroma"
const MAX_URL = "https://max.ru/u/f9LHodD0cOLyH2LKdrQKcQl4Nsa3gKWJr19T8bK7YheHW1S1rqELeSgxE2o"

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
    id: 3,
    title: "Мытьё окон",
    tagline: "Чтобы окна сияли чистотой",
    features: [
      "Чтобы окна сияли чистотой",
      "1–2 исполнителя",
      "Моем все окна в помещении: рамы, отливы, подоконники, москитные сетки",
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
  {
    id: 5,
    title: "Озонация",
    tagline: "Глубокая и эффективная уборка",
    features: [
      "Глубокая и эффективная уборка",
      "1–2 исполнителя",
      "Избавиться от насекомых (клопов, тараканов) и грызунов",
      "Клининг на всю высоту",
      "Работа 2–4 часа",
    ],
    accent: false,
  },
  {
    id: 6,
    title: "Уборка после ЧП",
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
  {
    id: 7,
    title: "Коммерческая недвижимость",
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

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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

              <div className="mt-8 flex gap-2">
                <a
                  href={VK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-300 bg-[#0077FF] text-white hover:bg-[#0066DD]"
                >
                  ВК
                </a>
                <a
                  href={MAX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-300 bg-[#FF6B00] text-white hover:bg-[#e05e00]"
                >
                  МАХ
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
          <div className="flex justify-center">
            <SocialButtons variant="light" />
          </div>
        </div>
      </div>
    </section>
  )
}