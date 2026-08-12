<script setup>
import { onMounted, ref } from "vue"
import { Github, ExternalLink } from "lucide-vue-next"

const card = ref(null)

onMounted(() => {
  if (!card.value || !("IntersectionObserver" in window)) {
    card.value?.classList.add("is-visible")
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        card.value?.classList.add("is-visible")
        observer.disconnect()
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8%" },
  )

  observer.observe(card.value)
})

defineProps({
  title: String,
  description: String,
  techStack: Array,
  image: String,
  projectUrl: String,
  githubUrl: String,
  liveUrl: String,
})
</script>

<template>
  <article
    ref="card"
    class="group reveal-on-scroll flex flex-col overflow-hidden rounded-xs bg-surface-muted shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
  >
    <img
      v-if="image"
      :src="image"
      :alt="title"
      class="h-48 w-full rounded-t-xs object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
    <div class="flex flex-1 flex-col p-7">
    <h3 class="text-lg font-semibold text-text-secondary">
      <a v-if="projectUrl" :href="projectUrl" class="transition-colors hover:text-text-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse">{{ title }}</a>
      <template v-else>{{ title }}</template>
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
      <a v-if="projectUrl" :href="projectUrl" class="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse">Case Study</a>
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
    </div>
  </article>
</template>
