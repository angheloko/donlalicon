<template>
  <div>
    <div class="mb-4">
      <label for="title">Title</label>
      <input id="title" v-model="blog.title" type="text" placeholder="Title">
    </div>
    <div class="mb-4">
      <label for="id">ID</label>
      <input id="id" v-model="blog.id" type="text" placeholder="ID">
    </div>
    <div class="mb-4">
      <label>
        <input v-model="blog.published" class="mr-2 leading-tight" type="checkbox">
        <span class="text-sm">
          Published
        </span>
      </label>
    </div>
    <div class="mb-4">
      <editor v-model="blog.body" />
    </div>
    <div class="mb-4">
      <label for="lead">Lead</label>
      <textarea id="lead" v-model="blog.lead" placeholder="Lead" />
    </div>
    <div class="mb-4">
      <label for="teaser">Teaser</label>
      <textarea id="teaser" v-model="blog.teaser" placeholder="Teaser" />
    </div>
    <div class="mb-4">
      <label for="imageUrl">Image URL</label>
      <input id="imageUrl" v-model="blog.imageUrl" type="text" placeholder="Image URL">
    </div>
    <div class="mb-4">
      <label for="imageAlt">Image Alt</label>
      <input id="imageAlt" v-model="blog.imageAlt" type="text" placeholder="Image Alt">
    </div>
    <div class="mb-4">
      <label for="imageCaption">Image caption</label>
      <textarea id="imageCaption" v-model="blog.imageCaption" placeholder="Image caption" />
    </div>
    <div class="mb-4">
      <button @click="updateValue" type="button">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Editor from '~/components/Editor'

export default {
  name: 'BlogForm',
  components: { Editor },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      blog: {}
    }
  },
  mounted () {
    this.blog = cloneDeep(this.value)
  },
  methods: {
    updateValue () {
      this.$emit('input', cloneDeep(this.blog))
    }
  }
}
</script>

<style scoped>
label {
  @apply
    block
    text-gray-600
    text-sm
    font-bold
    mb-2;
}
textarea,
input[type="text"] {
  @apply
    shadow
    appearance-none
    border
    rounded
    w-full
    py-2
    px-3
    leading-tight;
}
textarea:focus,
input[type="text"]:focus {
  @apply
    outline-none
    border-blue-500;
}
button {
  @apply
    shadow
    bg-blue-500
    text-white
    font-bold
    py-2
    px-4
    rounded;
}
button:hover {
  @apply bg-blue-400;
}
button:focus {
  @apply outline-none;
}
</style>
