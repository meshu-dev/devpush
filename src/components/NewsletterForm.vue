<script setup lang="ts">
  import { ref, toRaw } from 'vue'
  import type { Ref } from 'vue'

  type FormData = {
    name: string,
    email: string,
  }

  const formData: Ref<FormData>       = ref({ name: '', email: '' })
  const formMessage: Ref<string|null> = ref(null)
  const formErrors: Ref<string[]>     = ref([])

  const submit = async () => {
    formErrors.value = []

    const apiUrl: string = `${import.meta.env.PUBLIC_HYPER_URL}/newsletter/signup`
    const params: object = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(toRaw(formData.value)),
    }

    console.log('Bing!', toRaw(formData.value))

    try {
      const response = await fetch(`${apiUrl}/`, params)
      const data     = await response.json()

      if (data.errors) {
        showFieldErrors(data.errors)
      }

      if (response.ok) {
        formMessage.value = 'Your details have been submitted'
        formData.value.name = ''
        formData.value.email = ''
      }
    } catch (error) {
      console.error("Error:", error)
      //formErrors.value.push(error)
    }
  }

  const showFieldErrors = (errors: {[key: string]: string }) => {
    formErrors.value = []
    const fields = Object.keys(errors)

    for (const field of fields) {
      for (const message of errors[field]) {
        formErrors.value.push(message)
      }
    }
  }
</script>

<template>
  <div
    v-if="formErrors.length > 0"
    class="message-error mb-4">
    <p v-for="formError in formErrors" class="mb-2">
      {{ formError }}
    </p>
  </div>
  <div v-if="formMessage" class="message-success mb-4">{{ formMessage }}</div>
  <form
    method="POST"
    class="flex flex-col items-start gap-4"
    @submit.prevent="submit">
    <input
      v-model="formData.name"
      type="text"
      class="field"
      placeholder="Name" />
    <input
      v-model="formData.email"
      type="email"
      class="field"
      placeholder="Email" />
    <input
      type="submit"
      class="button"
      value="Submit" />
  </form>
</template>
