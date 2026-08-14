import './style.css'

const shouldResetScroll = !window.location.hash

const resetScrollTop = () => {
  if (!shouldResetScroll) return
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

resetScrollTop()

document.addEventListener('DOMContentLoaded', () => {
  resetScrollTop()
  requestAnimationFrame(resetScrollTop)
  setTimeout(resetScrollTop, 0)
  setTimeout(resetScrollTop, 100)
})

window.addEventListener('load', () => {
  resetScrollTop()
  requestAnimationFrame(resetScrollTop)
  setTimeout(resetScrollTop, 100)
})
const checkoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL?.trim()
const videoUrl = import.meta.env.VITE_BAL_STUDIO_VIDEO_URL?.trim()

document.querySelectorAll('.js-checkout-link').forEach((link) => {
  if (checkoutUrl) {
    link.href = checkoutUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  } else {
    link.href = '#membership'
    link.setAttribute('aria-disabled', 'true')
    link.title = '申込みURLは現在準備中です'
  }
})

const getYouTubeId = (url) => {
  if (!url) return null
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1)
    if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v')
  } catch {
    return null
  }

  return null
}

const videoId = getYouTubeId(videoUrl)
const videoShell = document.querySelector('#video-shell')
const videoSection = document.querySelector('#overview-video')

if (videoId && videoShell) {
  videoShell.innerHTML = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}"
      title="【ミナミ解説｜BAL STUDIOとは？】トレーナーの未来を変える新しい学習プラットフォーム"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `
  if (videoSection) {
    videoSection.hidden = false
  }
} else if (videoSection) {
  videoSection.hidden = true
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.08 },
)

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return
    document.querySelectorAll('details[open]').forEach((openDetail) => {
      if (openDetail !== detail) openDetail.open = false
    })
  })
})

document.querySelectorAll('.js-checkout-link[data-cta-position]').forEach((link) => {
  link.addEventListener('click', () => {
    window.dataLayer?.push({
      event: 'membership_cta_click',
      cta_position: link.dataset.ctaPosition,
      landing_page: 'bal_studio_trial_conversion',
    })
  })
})
