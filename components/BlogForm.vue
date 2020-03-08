<template>
  <div class="lg:flex mx-auto justify-center">
    <div class="lg:w-2/4">
      <div class="mx-5">
        <div class="mb-4">
          <label for="title">Title</label>
          <input id="title" v-model="blog.title" @input="updateId" type="text" placeholder="Title">
        </div>
        <editor v-model="blog.body" />
      </div>
    </div>
    <div class="lg:w-1/4">
      <div class="rounded border shadow p-2">
        <div class="mb-4">
          <label for="id">ID</label>
          <input id="id" ref="id" v-model="blog.id" type="text" placeholder="ID">
        </div>
        <div class="mb-4">
          <label>
            <input v-model="blog.published" class="mr-2 leading-tight" type="checkbox">
            <span class="text-sm">Published</span>
          </label>
        </div>
        <div class="mb-4">
          <label for="imageUrl">Image</label>
          <div v-if="blog.imageUrl">
            <img :src="blog.imageUrl" class="w-24 md:w-32 h-auto object-cover inline-block" alt="">
            <button
              v-if="blog.imageUrl"
              @click="deleteImage"
              :disabled="isDeletingImage"
              type="button"
              class="bg-red-500 border-red-300 text-white"
            >
              {{ isDeletingImage ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
          <button
            v-if="!blog.imageUrl"
            @click="launchImageFile"
            :disabled="isUploadingImage"
            type="button"
          >
            {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
          </button>
          <input
            ref="imageFile"
            @change.prevent="uploadImageFile($event.target.files)"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
          >
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
          <label for="lead">Lead</label>
          <textarea id="lead" v-model="blog.lead" placeholder="Lead" />
        </div>
        <div class="mb-4">
          <label for="teaser">Teaser</label>
          <textarea id="teaser" v-model="blog.teaser" placeholder="Teaser" />
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
      default: () => {
      }
    }
  },
  data () {
    return {
      blog: {},
      tags: '',
      status: '',
      originalId: '',
      isUploadingImage: false,
      isDeletingImage: false,
      FULL_IMAGE: {
        maxDimension: 1280,
        quality: 0.9
      },
      THUMB_IMAGE: {
        maxDimension: 640,
        quality: 0.7
      }
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
  mounted () {
    this.originalId = this.blog.id
  },
  methods: {
    async submitForm () {
      if (!this.blog.id) {
        alert('Please enter the blog ID.')
        this.$refs.id.focus()
        return
      }

      if (this.originalId !== this.blog.id) {
        const exists = await this.checkExists(this.blog.id)
        if (exists) {
          alert('Blog ID already exists. Please enter a unique blog ID.')
          this.$refs.id.focus()
          return
        }
      }

      await this.updateValue()
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
        const promises = []

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

        promises.push(promise1, promise2)

        if (this.originalId && this.originalId !== id) {
          const promise3 = db.collection('blogs').doc(this.originalId).delete()
          const promise4 = db.collection('teasers').doc(this.originalId).delete()

          promises.push(promise3, promise4)
        }

        await Promise.all(promises)
      } catch (error) {
        alert('Error saving blog or teaser')
        // eslint-disable-next-line no-console
        console.error(error)
      }

      blog.id = id
      this.$emit('input', cloneDeep(blog))

      this.status = ''

      if (this.originalId !== id) {
        this.originalId = id

        this.$router.replace({
          name: 'blog-id-edit',
          params: {
            id: blog.id
          }
        })
      }
    },
    confirmDelete () {
      const result = window.confirm('Are you sure you want to delete this blog?')
      if (result) {
        if (this.originalId) {
          const db = this.$firebase.firestore()

          const promise1 = db.collection('blogs').doc(this.originalId).delete()
          const promise2 = db.collection('teasers').doc(this.originalId).delete()

          Promise.all([promise1, promise2])
            .then(() => {
              alert('Blog deleted!')
              this.$router.push({
                path: '/admin'
              })
            })
            .catch((error) => {
              alert('Unable to delete blog!')
              // eslint-disable-next-line no-console
              console.error(error)
            })
        }
      }
    },
    updateId () {
      this.blog.id = this.slugify(this.blog.title)
    },
    async checkExists () {
      const db = this.$firebase.firestore()
      const documentSnapshot = await db.collection('blogs').doc(this.blog.id).get()
      return documentSnapshot.exists
    },
    /**
     * @see https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
     */
    slugify (string) {
      const a =
        'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
      const b =
        'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    },
    launchImageFile () {
      this.$refs.imageFile.click()
    },
    async uploadImageFile (files) {
      if (!files.length) {
        return
      }
      const file = files[0]

      if (!file.type.match('image.*')) {
        alert('Please upload an image.')
        return
      }

      const metadata = {
        contentType: file.type
      }

      const fullImageResizePromise = new Promise((resolve, reject) => {
        this.generateVariation(file, this.FULL_IMAGE.maxDimension, this.FULL_IMAGE.quality, resolve)
      })

      const thumbImageResizePromise = new Promise((resolve, reject) => {
        this.generateVariation(file, this.THUMB_IMAGE.maxDimension, this.THUMB_IMAGE.quality, resolve)
      })

      const images = await Promise.all([fullImageResizePromise, thumbImageResizePromise])

      const fullImageUploadPromise = this.uploadSingleImageFile(file.name, images[0], metadata)

      const thumbFileName = file.name.substring(0, file.name.lastIndexOf('.')) + '_thumb.' + file.name.substring(file.name.lastIndexOf('.') + 1)
      const thumbImageUploadPromise = this.uploadSingleImageFile(thumbFileName, images[1], metadata)

      this.isUploadingImage = true

      return Promise.all([fullImageUploadPromise, thumbImageUploadPromise])
        .then((results) => {
          this.blog.imageUrl = results[0]
          this.blog.teaserImageUrl = results[1]
        })
        .finally(() => {
          this.isUploadingImage = false
        })
    },
    uploadSingleImageFile (filename, blob, metadata) {
      const storage = this.$firebase.storage()
      const imageRef = storage.ref(`images/${filename}`)

      return imageRef.put(blob, metadata).then((snapshot) => {
        return snapshot.ref.getDownloadURL().then((url) => {
          return url
        })
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error uploading image', error)
      })
    },
    generateVariation (file, maxDimension, quality, cb) {
      const displayPicture = (url) => {
        const image = new Image()
        image.src = url
        image.onload = () => {
          const canvas = this.getScaledCanvas(image, maxDimension)
          canvas.toBlob(cb, 'image/jpeg', quality)
        }
      }

      const reader = new FileReader()
      reader.onload = e => displayPicture(e.target.result)
      reader.readAsDataURL(file)
    },
    getScaledCanvas (image, maxDimension) {
      const scaledCanvas = document.createElement('canvas')

      if (image.width > maxDimension || image.height > maxDimension) {
        if (image.width > image.height) {
          scaledCanvas.width = maxDimension
          scaledCanvas.height = (maxDimension * image.height) / image.width
        } else {
          scaledCanvas.width = (maxDimension * image.width) / image.height
          scaledCanvas.height = maxDimension
        }
      } else {
        scaledCanvas.width = image.width
        scaledCanvas.height = image.height
      }
      scaledCanvas
        .getContext('2d')
        .drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          scaledCanvas.width,
          scaledCanvas.height
        )
      return scaledCanvas
    },
    deleteImage () {
      this.isDeletingImage = true

      const fullImageDeletePromise = this.$firebase.storage().refFromURL(this.blog.imageUrl).delete()
      const thumbImageDeletePromise = this.$firebase.storage().refFromURL(this.blog.teaserImageUrl).delete()

      Promise.all([fullImageDeletePromise, thumbImageDeletePromise])
        .then(() => {
          this.blog.imageUrl = ''
          this.blog.teaserImageUrl = ''
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error deleting image', error)

          if (error.code === 'storage/object-not-found') {
            this.blog.imageUrl = ''
            this.blog.teaserImageUrl = ''
          }
        })
        .finally(() => {
          this.isDeletingImage = false
        })
    }
  }
}
</script>
