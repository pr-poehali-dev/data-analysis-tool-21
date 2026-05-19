const VK_URL = "https://vk.com/kliningkostroma"
const MAX_URL = "https://max.ru/u/f9LHodD0cOLyH2LKdrQKcQl4Nsa3gKWJr19T8bK7YheHW1S1rqELeSgxE2o"

const VkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.566c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
  </svg>
)

const MaxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14h-2l-2.5-4-2.5 4h-2l3.5-5.5L7.5 5h2l2.5 3.8L14.5 5h2l-3.5 5.5L16.5 16z"/>
  </svg>
)

interface SocialButtonsProps {
  variant?: "dark" | "light" | "inline"
  className?: string
}

export function SocialButtons({ variant = "dark", className = "" }: SocialButtonsProps) {
  if (variant === "inline") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <a
          href={VK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#0077FF] text-white px-6 py-3 text-sm font-medium hover:bg-[#0066DD] transition-colors duration-300"
        >
          <VkIcon />
          ВКонтакте
        </a>
        <a
          href={MAX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-6 py-3 text-sm font-medium hover:bg-[#e05e00] transition-colors duration-300"
        >
          <MaxIcon />
          МАХ
        </a>
      </div>
    )
  }

  if (variant === "light") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <a
          href={VK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#0077FF] text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#0066DD] transition-colors duration-300"
        >
          <VkIcon />
          ВКонтакте
        </a>
        <a
          href={MAX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#e05e00] transition-colors duration-300"
        >
          <MaxIcon />
          МАХ
        </a>
      </div>
    )
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={VK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#0077FF] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#0066DD] transition-colors duration-300"
      >
        <VkIcon />
        ВКонтакте
      </a>
      <a
        href={MAX_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#e05e00] transition-colors duration-300"
      >
        <MaxIcon />
        МАХ
      </a>
    </div>
  )
}
