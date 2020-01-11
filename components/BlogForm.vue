<template>
  <div class="flex">
    <div class="max-w-2xl mr-5">
      <editor v-model="blog.body" />
    </div>
    <div class="flex-grow">
      <div class="mb-4">
        <label for="title">Title</label>
        <input id="title" v-model="blog.title" type="text" placeholder="Title">
      </div>
      <div class="mb-4">
        <label for="id">ID</label>
        <input id="id" ref="id" v-model="blog.id" type="text" placeholder="ID">
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
        <label for="teaserImageUrl">Teaser image URL</label>
        <input id="teaserImageUrl" v-model="blog.teaserImageUrl" type="text" placeholder="Teaser image URL">
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
        <label for="tags">Tags</label>
        <input id="tags" v-model="tags" type="text" placeholder="Tags">
      </div>
      <div class="mb-4">
        <label for="description">Description</label>
        <textarea id="description" v-model="blog.description" placeholder="Description" />
      </div>
      <div class="mb-4 clearfix">
        <div class="float-left">
          <button
            :disabled="!!status"
            @click="submitForm"
            type="button"
          >
            {{ status ? status : 'Save' }}
          </button>
          <a :href="`/blog/${blog.id}/preview`" class="ml-2" target="_blank">Preview</a>
        </div>
        <div class="float-right">
          <button
            @click="confirmDelete"
            type="button"
            class="bg-red-500 border-red-300 text-white"
          >
            Delete
          </button>
        </div>
      </div>
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
      blog: {},
      tags: '',
      status: ''
    }
  },
  watch: {
    value: {
      handler (newValue) {
        this.blog = cloneDeep(newValue)
        this.tags = this.blog.tags ? this.blog.tags.join() : ''
      },
      immediate: true
    }
  },
  methods: {
    submitForm () {
      // Validate the form.
      // @todo Check that the ID is unique.
      if (!this.blog.id) {
        alert('Please specify the blog ID.')
        this.$refs.id.focus()
      } else {
        this.updateValue()
      }
    },
    async updateValue () {
      this.status = 'Saving...'

      const serverTimestamp = this.$firebase.firestore.FieldValue.serverTimestamp()
      const db = this.$firebase.firestore()
      const blog = cloneDeep(this.blog)

      const id = blog.id
      delete blog.id

      if (!blog.created) {
        blog.created = serverTimestamp
      }

      blog.changed = serverTimestamp

      blog.tags = this.tags.trim() !== '' ? this.tags.split(',').map(item => item.trim()) : []

      try {
        const promise1 = db.collection('blogs').doc(id).set(blog)

        const teaser = {
          title: blog.title,
          body: blog.teaser || '',
          tags: blog.tags,
          imageUrl: blog.teaserImageUrl || null,
          imageAlt: blog.imageAlt || '',
          created: blog.created,
          changed: blog.changed,
          published: blog.published || false
        }

        const promise2 = db.collection('teasers').doc(id).set(teaser)

        await Promise.all([promise1, promise2])
      } catch (error) {
        alert('Error saving blog or teaser')
        // eslint-disable-next-line no-console
        console.error(error)
      }

      blog.id = id
      this.$emit('input', cloneDeep(blog))

      this.status = ''
    },
    confirmDelete () {
      const result = window.confirm('Are you sure you want to delete this blog?')
      if (result) {
        if (this.blog.id) {
          const db = this.$firebase.firestore()

          const promise1 = db.collection('blogs').doc(this.blog.id).delete()
          const promise2 = db.collection('teasers').doc(this.blog.id).delete()

          Promise.all([promise1, promise2])
            .then(() => {
              alert('Blog deleted!')
            })
            .catch((error) => {
              alert('Unable to delete blog!')
              // eslint-disable-next-line no-console
              console.error(error)
            })
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
