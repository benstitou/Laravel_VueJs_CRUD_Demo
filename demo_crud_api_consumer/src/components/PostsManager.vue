<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Posts Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.name }}</td>
              <td>{{ post.description }}</td>
              <td>{{ post.created_at }}</td>
              <td>{{ post.updated_at }}</td>
              <td class="text-right">
                <a href="#" v-b-modal.myModal @click.prevent="populatePostToEdit(post)">Edit Modal</a> - 
                <a href="#" @click.prevent="populatePostToEdit(post)">Edit</a> - 
                <a href="#" @click.prevent="deletePost(post.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :name="(model.id ? 'Edit Post ID#' + model.id : 'New Post')">
          <form @submit.prevent="savePost">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="model.description"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Post</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>

      <div>
        <!-- the modal -->
        <b-modal id="myModal" hide-footer ref="myModalRef">
          <b-card :name="(model.id ? 'Edit Post ID#' + model.id : 'New Post')">
            <form @submit.prevent="savePost">
              <b-form-group label="Name">
                <b-form-input type="text" v-model="model.name"></b-form-input>
              </b-form-group>
              <b-form-group label="Body">
                <b-form-textarea rows="4" v-model="model.description"></b-form-textarea>
              </b-form-group>
              <div>
                <b-btn type="submit" variant="success">Save Post</b-btn>
              </div>
            </form>
          </b-card>
        </b-modal>
      </div>


  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      posts: [],
      model: {}
    }
  },
  async created () {
    this.refreshPosts()
  },
  methods: {
    async refreshPosts () {
      this.loading = true
      this.posts = await api.getPosts()
      this.loading = false
    },
    async populatePostToEdit (post) {
      this.model = Object.assign({}, post)
    },
    async savePost () {
      if (this.model.id) {
        await api.updatePost(this.model.id, this.model)
      } else {
        await api.createPost(this.model)
      }
      this.model = {} // reset form
      await this.refreshPosts()

      this.$refs.myModalRef.hide()
    },
    async deletePost (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deletePost(id)
        await this.refreshPosts()
      }
    }
  }
}
</script>