import { HighlightedText } from "./HighlightedText"
import { SocialButtons } from "./SocialButtons"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Заказать уборку</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Готовы к <HighlightedText>идеальной</HighlightedText>
            <br />
            чистоте?
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Напишите нам — рассчитаем стоимость по фото и запишем на удобное время. Быстро, честно, без скрытых доплат.
          </p>

          <div className="flex justify-center">
            <SocialButtons variant="light" />
          </div>
        </div>
      </div>
    </section>
  )
}