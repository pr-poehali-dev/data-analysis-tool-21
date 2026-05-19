import { useState } from "react"
import { cn } from "@/lib/utils"

type Step = 1 | 2 | 3 | 4 | 5

const TOTAL_STEPS = 5

export function QuizBlock() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState({
    cleanType: "",
    roomType: "",
    area: "",
    date: "",
    name: "",
    phone: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const goNext = () => {
    setDirection("next")
    setStep((s) => (s + 1) as Step)
  }

  const goPrev = () => {
    setDirection("prev")
    setStep((s) => (s - 1) as Step)
  }

  const handleChoice = (field: string, value: string) => {
    setAnswers((a) => ({ ...a, [field]: value }))
    setTimeout(() => goNext(), 200)
  }

  const handleSubmit = async () => {
    await fetch("https://functions.poehali.dev/222c48a5-f8e5-4759-9f9e-beba1d5271d4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
    setSubmitted(true)
  }

  const cleanTypes = [
    { value: "Поддерживающая", emoji: "🧹" },
    { value: "Генеральная", emoji: "✨" },
    { value: "После ремонта", emoji: "🔨" },
    { value: "Мойка окон", emoji: "🪟" },
    { value: "После ЧП (пожар, потоп)", emoji: "🚨" },
    { value: "Химчистка", emoji: "👕" },
  ]

  const roomTypes = [
    { value: "Квартира", emoji: "🏠" },
    { value: "Дом", emoji: "🏡" },
    { value: "Офис", emoji: "🏢" },
    { value: "Другое помещение", emoji: "🏪" },
  ]

  return (
    <section id="quiz" className="py-16 md:py-24 bg-primary overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">

        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] uppercase text-white/50 mb-3">Быстро и просто</p>
          <h2 className="text-3xl md:text-4xl font-medium text-white">Рассчитайте стоимость клининга</h2>
        </div>

        <div className="flex items-center gap-2 mb-10">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i + 1 <= step ? "bg-white" : "bg-white/20"
              )}
            />
          ))}
        </div>

        <div className="relative min-h-[320px]">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-6">🎉</div>
              <h3 className="text-2xl font-medium text-white mb-3">Отлично, {answers.name}!</h3>
              <p className="text-white/70 text-lg">Мы получили вашу заявку и перезвоним в ближайшее время.</p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-8">
                    Какая уборка вам нужна?
                  </h3>
                  <div className="flex flex-col gap-3">
                    {cleanTypes.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleChoice("cleanType", item.value)}
                        className={cn(
                          "flex items-center gap-4 px-6 py-4 rounded-xl border text-left transition-all duration-200",
                          answers.cleanType === item.value
                            ? "bg-white text-foreground border-white"
                            : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                        )}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-base font-medium">{item.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-8">
                    Какое у вас помещение?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {roomTypes.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleChoice("roomType", item.value)}
                        className={cn(
                          "flex flex-col items-center gap-3 px-4 py-6 rounded-xl border text-center transition-all duration-200",
                          answers.roomType === item.value
                            ? "bg-white text-foreground border-white"
                            : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                        )}
                      >
                        <span className="text-3xl">{item.emoji}</span>
                        <span className="text-sm font-medium">{item.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                    Какая площадь помещения?
                  </h3>
                  <p className="text-white/60 mb-8">Укажите приблизительно, в квадратных метрах</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      placeholder="Например: 60"
                      value={answers.area}
                      onChange={(e) => setAnswers((a) => ({ ...a, area: e.target.value }))}
                      className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-white transition-colors"
                    />
                    <span className="text-white/60 text-lg">м²</span>
                  </div>
                  <button
                    onClick={goNext}
                    disabled={!answers.area}
                    className="mt-8 w-full py-4 rounded-xl bg-white text-foreground font-medium text-base disabled:opacity-40 hover:bg-white/90 transition-all duration-200"
                  >
                    Продолжить →
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                    Удобная для вас дата уборки
                  </h3>
                  <p className="text-white/60 mb-8">Выберите день, когда вам удобно</p>
                  <input
                    type="date"
                    value={answers.date}
                    onChange={(e) => setAnswers((a) => ({ ...a, date: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-white transition-colors [color-scheme:dark]"
                  />
                  <button
                    onClick={goNext}
                    disabled={!answers.date}
                    className="mt-8 w-full py-4 rounded-xl bg-white text-foreground font-medium text-base disabled:opacity-40 hover:bg-white/90 transition-all duration-200"
                  >
                    Продолжить →
                  </button>
                </div>
              )}

              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="text-center mb-8">
                    <div className="text-4xl mb-3">🎁</div>
                    <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                      Вы получили подарок — скидка 10% от стоимости заказа
                    </h3>
                    <p className="text-white/60">Введите ваше имя и телефон, чтобы забрать скидку</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={answers.name}
                      onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-6 py-4 text-base focus:outline-none focus:border-white transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Номер телефона"
                      value={answers.phone}
                      onChange={(e) => setAnswers((a) => ({ ...a, phone: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-6 py-4 text-base focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!answers.name || !answers.phone}
                    className="mt-6 w-full py-4 rounded-xl bg-white text-foreground font-semibold text-base disabled:opacity-40 hover:bg-white/90 transition-all duration-200"
                  >
                    Получить скидку 10% →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {!submitted && step > 1 && (
          <button
            onClick={goPrev}
            className="mt-6 text-white/50 hover:text-white text-sm transition-colors"
          >
            ← Назад
          </button>
        )}

      </div>
    </section>
  )
}

export default QuizBlock