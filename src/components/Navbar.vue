<script setup>
import { onMounted, ref } from "vue"
import { Menu, X } from "lucide-vue-next"

const isMenuOpen = ref(false)
const activeSection = ref("home")

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Tech Stacks", href: "/#tech-stacks" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function getLinkTarget(href) {
  return href.includes("#") ? href.split("#")[1] : "home"
}

function handleNavClick(event, href) {
  const [path, hash] = href.split("#")
  const isCurrentPage = !path || path === window.location.pathname
  const target = hash ? document.getElementById(hash) : null

  if (!hash || !isCurrentPage || !target) {
    closeMenu()
    return
  }

  event.preventDefault()
  closeMenu()

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches

  target.classList.remove("nav-section-focus")
  requestAnimationFrame(() => {
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    })

    if (!prefersReducedMotion) {
      target.classList.add("nav-section-focus")
      window.setTimeout(() => target.classList.remove("nav-section-focus"), 900)
    }
  })

  window.history.replaceState(null, "", `#${hash}`)
}

onMounted(() => {
  const sections = ["home", "tech-stacks", "projects", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean)

  if (!("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible[0]) activeSection.value = visible[0].target.id
    },
    { rootMargin: "-18% 0px -68%", threshold: 0 },
  )

  sections.forEach((section) => observer.observe(section))
})
</script>

<template>
  <nav
    class="sticky top-0 z-50 border-b border-black/5 bg-surface-muted"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <a
        href="/"
        class="inline-flex items-center gap-2 text-lg font-bold text-text-secondary transition-colors hover:text-text-inverse"
        @click="closeMenu"
      >
        <svg viewBox="0 0 64 64" class="h-8 w-8" role="img" aria-label="KL logo">
          <rect x="4" y="4" width="56" height="56" rx="6" fill="white" stroke="#dce5ff" stroke-width="0.5" />
          <text x="32" y="47" text-anchor="middle" fill="#0b36a8" opacity="0.32" transform="translate(0 1.5)" font-family="'Open Sans', Arial, sans-serif" font-size="43" font-weight="700" letter-spacing="-1">KL</text>
          <text x="32" y="47" text-anchor="middle" fill="#2259ec" font-family="'Open Sans', Arial, sans-serif" font-size="43" font-weight="700" letter-spacing="-1">KL</text>
        </svg>
        Kelvin Lamptey
      </a>
      <button
        class="inline-flex items-center justify-center rounded-xs p-2 text-text-primary transition-colors hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse md:hidden"
        @click="toggleMenu"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMenuOpen"
      >
        <Menu v-if="!isMenuOpen" :size="24" />
        <X v-else :size="24" />
      </button>
      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            :class="[
              'nav-link text-sm font-medium text-text-primary transition-colors hover:text-text-secondary',
              { 'nav-link-active': activeSection === getLinkTarget(link.href) },
            ]"
            @click="handleNavClick($event, link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
    <div
      v-if="isMenuOpen"
      class="border-t border-black/5 px-6 pb-4 md:hidden"
    >
      <ul class="flex flex-col gap-3 pt-3">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            :class="[
              'nav-link block text-sm font-medium text-text-primary transition-colors hover:text-text-secondary',
              { 'nav-link-active': activeSection === getLinkTarget(link.href) },
            ]"
            @click="handleNavClick($event, link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
