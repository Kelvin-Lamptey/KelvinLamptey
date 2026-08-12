<script setup>
import { ref } from "vue"
import { Menu, X } from "lucide-vue-next"

const isMenuOpen = ref(false)

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
        <img src="/favicon.svg" alt="" aria-hidden="true" class="h-8 w-8" />
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
            class="text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
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
            class="block text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
            @click="handleNavClick($event, link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
