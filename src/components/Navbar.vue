<script setup>
import { ref } from "vue"
import { Menu, X } from "lucide-vue-next"

const isMenuOpen = ref(false)

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <nav
    class="sticky top-0 z-50 border-b border-black/5 bg-surface-muted"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <a
        href="/"
        class="text-lg font-bold text-text-secondary transition-colors hover:text-text-inverse"
        @click="closeMenu"
      >
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
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
