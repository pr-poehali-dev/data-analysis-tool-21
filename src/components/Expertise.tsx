import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"
import { HighlightedText } from "./HighlightedText"

const whyUs = [
  {
    title: "Работаем быстро и чисто",
    description: "Бригада приедет в точно назначенное время и выполнит уборку в срок. После нас не остаётся следов нашего пребывания — только чистота.",
    icon: "Clock",
  },
  {
    title: "Безопасные средства",
    description: "Применяем профессиональную химию, безвредную для детей, домашних животных и аллергиков. Запах свежести — без резких химических ароматов.",
    icon: "ShieldCheck",
  },
  {
    title: "Доступные цены",
    description: "Честное ценообразование без скрытых доплат. Цена озвучивается до начала работ и не меняется в процессе.",
    icon: "BadgeCheck",
  },
  {
    title: "Работаем в Костроме",
    description: "Оперативно выезжаем по всей Костроме и окрестностям. Принимаем заявки через ВКонтакте — удобно и быстро.",
    icon: "MapPin",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="why" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О нас</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Профессионалы</HighlightedText>,
            <br />
            которым доверяют
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Клининговая компания в Костроме. Убираем квартиры любой сложности — от лёгкой поддерживающей до полной генеральной уборки.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {whyUs.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Icon name={area.icon} fallback="Star" className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
              <h3 className="text-xl font-medium mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
