import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"
import { QuizBlock } from "../components/QuizBlock"
import { BeforeAfter } from "../components/BeforeAfter"
import { Certificates } from "../components/Certificates"

export default function Index() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <QuizBlock />
      <Philosophy />
      <Projects />
      <Expertise />
      <Certificates />
      <BeforeAfter />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}