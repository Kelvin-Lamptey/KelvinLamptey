<script setup>
import { ref } from "vue"
import { SendHorizontal } from "lucide-vue-next"

const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY
const name = ref("")
const email = ref("")
const message = ref("")
const submitted = ref(false)

async function handleSubmit(e) {
  e.preventDefault()
  const form = e.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    submitted.value = true
    name.value = ""
    email.value = ""
    message.value = ""
  }
}
</script>

<template>
  <div>
    <div
      v-if="submitted"
      class="rounded-xs bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700"
    >
      Thank you! Your message has been sent successfully.
    </div>
    <form
      v-else
      @submit="handleSubmit"
      class="space-y-5"
    >
      <input type="hidden" name="access_key" :value="accessKey" />
      <input type="hidden" name="from_name" value="Portfolio Contact" />
      <div>
        <label for="name" class="mb-1 block text-sm font-medium text-text-secondary">
          Name
        </label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          required
          class="w-full rounded-xs border border-black/10 bg-surface-muted px-4 py-2.5 text-sm text-text-secondary placeholder:text-text-primary/60 transition-colors focus:border-text-inverse focus:outline-none focus:ring-2 focus:ring-text-inverse/20"
          placeholder="Your name"
        />
      </div>
      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-text-secondary">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          required
          class="w-full rounded-xs border border-black/10 bg-surface-muted px-4 py-2.5 text-sm text-text-secondary placeholder:text-text-primary/60 transition-colors focus:border-text-inverse focus:outline-none focus:ring-2 focus:ring-text-inverse/20"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label for="message" class="mb-1 block text-sm font-medium text-text-secondary">
          Message
        </label>
        <textarea
          id="message"
          v-model="message"
          name="message"
          required
          rows="5"
          class="w-full resize-y rounded-xs border border-black/10 bg-surface-muted px-4 py-2.5 text-sm text-text-secondary placeholder:text-text-primary/60 transition-colors focus:border-text-inverse focus:outline-none focus:ring-2 focus:ring-text-inverse/20"
          placeholder="Your message..."
        />
      </div>
      <button
        type="submit"
        class="inline-flex items-center gap-2 rounded-xs bg-text-inverse px-6 py-2.5 text-sm font-semibold text-surface-muted transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
      >
        <SendHorizontal :size="16" />
        Send Message
      </button>
    </form>
  </div>
</template>
