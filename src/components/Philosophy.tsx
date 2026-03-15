import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const reasons = [
  {
    title: "Проверенные специалисты",
    description:
      "Все наши исполнители проходят обучение и проверку. Вы впускаете в дом только надёжных профессионалов.",
  },
  {
    title: "Профессиональная химия",
    description:
      "Используем сертифицированные средства, безопасные для детей и животных. Эффективно убираем загрязнения без вреда для поверхностей.",
  },
  {
    title: "Гарантия качества",
    description:
      "Если что-то не устроит — вернёмся и исправим бесплатно. Вы платите только за результат, который вас радует.",
  },
  {
    title: "Удобный сервис",
    description:
      "Рассчитаем стоимость по фото, приедем в удобное время. Никаких скрытых доплат — цена фиксируется до начала работы.",
  },
]

export function Philosophy() {
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
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши преимущества</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Почему выбирают
              <br />
              <HighlightedText>нас</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Чистая квартира после клининга"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Мы наводим порядок в сотнях квартир каждый месяц. Доверяйте профессионалам — и наслаждайтесь результатом.
            </p>

            {reasons.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
