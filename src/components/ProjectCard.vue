<script setup>
import { Github, ExternalLink } from "lucide-vue-next"

defineProps({
  title: String,
  description: String,
  techStack: Array,
  githubUrl: String,
  liveUrl: String,
})
</script>

<template>
  <article
    class="flex flex-col rounded-xs bg-surface-muted p-7 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
  >
    <h3 class="text-lg font-semibold text-text-secondary">
      {{ title }}
    </h3>
    <p class="mt-3 flex-1 text-sm leading-relaxed text-text-primary">
      {{ description }}
    </p>
    <div class="mt-5 flex flex-wrap gap-2">
      <span
        v-for="tech in techStack"
        :key="tech"
        class="inline-block rounded-xs bg-text-inverse/10 px-3 py-1 text-xs font-medium text-text-inverse"
      >
        {{ tech }}
      </span>
    </div>
    <div v-if="githubUrl || liveUrl" class="mt-6 flex items-center gap-4">
      <a
        v-if="githubUrl"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm font-medium text-text-inverse transition-colors hover:text-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
      >
        <Github :size="18" />
        View Source
      </a>
      <a
        v-if="liveUrl"
        :href="liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm font-medium text-text-inverse transition-colors hover:text-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
      >
        <ExternalLink :size="18" />
        Live Demo
      </a>
    </div>
  </article>
</template>
