<script setup>
import { Github, Linkedin, Twitter, Instagram } from "lucide-vue-next"
</script>

<template>
  <footer
    class="border-t border-black/5 bg-surface-muted"
  >
    <div
      class="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-8 sm:flex-row sm:justify-between"
    >
      <p class="text-center text-sm text-text-primary sm:text-left">
        &copy; 2026 Kelvin Nii Odartey Lamptey
      </p>
      <div class="flex items-center gap-5">
        <a
          href="https://github.com/kelvinlamptey"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-primary transition-colors hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
          aria-label="GitHub"
        >
          <Github :size="20" />
        </a>
        <a
          href="https://linkedin.com/in/kelvinlamptey"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-primary transition-colors hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
          aria-label="LinkedIn"
        >
          <Linkedin :size="20" />
        </a>
        <a
          href="https://twitter.com/kelvinlamptey"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-primary transition-colors hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
          aria-label="X (Twitter)"
        >
          <Twitter :size="20" />
        </a>
        <a
          href="https://instagram.com/kelvinlamptey"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-primary transition-colors hover:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
          aria-label="Instagram"
        >
          <Instagram :size="20" />
        </a>
      </div>
    </div>
  </footer>
</template>
