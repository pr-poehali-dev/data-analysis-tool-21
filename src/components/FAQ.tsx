import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как рассчитать стоимость уборки?",
    answer:
      "Пришлите нам фото вашей квартиры и комментарий о состоянии помещения в наш аккаунт ВКонтакте. Мы рассчитаем точную стоимость и согласуем удобное время.",
  },
  {
    question: "Вы привозите своё оборудование и средства?",
    answer:
      "Да, наши специалисты приезжают с профессиональным инвентарём и сертифицированной химией. Вам ничего не нужно готовить заранее.",
  },
  {
    question: "Безопасны ли ваши средства для детей и домашних животных?",
    answer:
      "Абсолютно. Мы используем только сертифицированные средства, безвредные для здоровья людей и животных. После уборки можно сразу находиться в квартире.",
  },
  {
    question: "Что входит в генеральную уборку?",
    answer:
      "Генеральная уборка включает полное удаление загрязнений на всей высоте помещения, чистку всех поверхностей, сантехники, бытовой техники снаружи. Приезжает бригада 2–4 человека, работа занимает 6–8 часов.",
  },
  {
    question: "Как записаться на уборку?",
    answer:
      "Напишите нам ВКонтакте vk.com/kliningkostroma — пришлите фото квартиры, укажите желаемую дату и вид уборки. Ответим в течение нескольких минут.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
