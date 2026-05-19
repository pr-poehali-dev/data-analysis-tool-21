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
          <h2 className="text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-6xl">
            <HighlightedText>Профессионалы</HighlightedText>,
            <br />
            которым доверяют
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Нашими партнерами являются:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { name: "Коллаж", logo: "https://avatars.mds.yandex.net/i?id=2bb5f7ac87a51d6483f61c7044aacf5a_sr-5225342-images-thumbs&n=13" },
              { name: "ЭТАЖИ", logo: "https://st35.stpulscen.ru/images/company_logos/000/328/906_big.png?1427958572" },
              { name: "Синяя птица", logo: "https://avatars.mds.yandex.net/i?id=3f8e53a64b0211946b186ae1802277b7_sr-5690699-images-thumbs&n=13" },
              { name: "АКТИВ КАРБОН", logo: "https://avatars.mds.yandex.net/i?id=7c9c8de923e2eb01a46f22c3e5b1d6c1_l-12471765-images-thumbs&n=13" },
              { name: "НОВОТЕКС+", logo: "https://avatars.mds.yandex.net/i?id=af4551468f3d0c6b10b0be16302c1f1ea7c0316d-9053045-images-thumbs&n=13" },
              { name: "Кинотеатр «Пять звёзд»", logo: "https://sun9-6.userapi.com/s/v1/ig2/lBTqDFJ4BTGg2xCxVrLYuzwVmpMro-LTsJaZS_JQkd2hYDLUq1Ypf2mrPSPYflx4DijRv0IssNsttdB0deZiKV4v.jpg?quality=96&as=32x19,48x29,72x44,108x66,160x97,240x146,360x219,480x292,540x328,640x389,720x438,1003x610&from=bu&u=pwmSvZ-vdbwQiA1DKQWnxQSYCYm_TMGgKX1PtSx8xgM&cs=1003x610" },
            ].map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className="w-full h-20 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
                <p className="text-sm text-center font-medium text-foreground">{partner.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <img
              src="https://cdn.poehali.dev/projects/650ff3e9-e7d6-4a0f-935f-7fcb054f7123/bucket/b92bbf52-9229-4120-bb3c-e0581cd5980e.jpg"
              alt="Наша команда"
              className="w-full rounded-2xl object-cover"
            />
          </div>
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