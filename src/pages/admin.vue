<template>
  <div>
    <nuxt-link to="/new" class="block mb-5 no-underline font-bold uppercase text-sm float-right">
      Create new article
    </nuxt-link>
    <table class="w-full">
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Title
          </th>
          <th>
            Status
          </th>
          <th>
            Created
          </th>
          <th>
            Changed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog of blogs" :key="blog.id">
          <td>
            <nuxt-link :to="{ name: 'blog-id-edit', params: { 'id': blog.id }}">
              {{ blog.id }}
            </nuxt-link>
          </td>
          <td>
            {{ blog.title }}
          </td>
          <td>
            {{ blog.published ? 'Published' : '' }}
          </td>
          <td>
            {{ blog.created | toDate }}
          </td>
          <td>
            {{ blog.changed | toDate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  middleware: 'authenticated-access',
  layout: 'admin',
  data () {
    return {
      blogs: []
    }
  },
  async mounted () {
    const db = this.$firebase.firestore()
    const querySnapshot = await db.collection('blogs')
      .orderBy('created', 'desc')
      .get()
    querySnapshot.forEach((doc) => {
      this.blogs.push({
        id: doc.id,
        ...doc.data()
      })
    })
  }
}
</script>

<style scoped>
thead > tr > th,
tbody > tr > td {
  @apply border px-4 py-2 text-left;
}
</style>
