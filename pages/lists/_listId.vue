<template>
  <div class="container">
    <h2>Tasklist: {{taskListName}}</h2>
    <div>
      <confirm-action action="Delete Tasklist"
                      :delete-key="taskListName"
                      :confirm-handler="deleteTaskList"
                      style="float: right">
        <p>Do you want to delete the tasklist <strong>{{taskListName}}</strong>
           and all associated tasks?</p>
      </confirm-action>
      <el-button type="primary" @click="showModal(true)">Create Task</el-button>
    </div>

    <el-table :data="tasks" style="width: 100%">
      <el-table-column label="Completed" width="110">
        <template slot-scope="scope">
          <el-checkbox :checked="!!scope.row.completed" @change="updateChecked(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column label="Files" width="150">
        <template slot-scope="scope">
          <div>
            <p v-if="!scope.row.files.length">None</p>
            <span v-for="file in scope.row.files" :key="file.id">
              {{ file.name }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Due Date" width="130">
        <template slot-scope="scope">
          <div>
            {{ dateValue(scope.row.due).date }}<br>
            {{ dateValue(scope.row.due).time }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Command" width=110>
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="showModal(true, scope.row)">Edit</el-button>
            <el-button type="text" class="danger" size="small" @click="confirmDeleteTask()">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Create New Task" :visible.sync="modalIsVisible">
      <el-form>
        <el-form-item label="Task Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createTasklists()">Create</el-button>
          <el-button @click="showModal(false)">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ConfirmAction from '~/components/ConfirmAction.vue'

export default Vue.extend({

  components: {
    ConfirmAction
  },

  data () {
    return {
      form: {
        name: ''
      },
      modalIsVisible: false,
      tasks: [
        {
          id: 1, description: 'My descripton', completed: null, due: new Date(), files: []
        }
      ]
    }
  },

  computed: {
    taskListName () {
      const lists = this.$store.state.todoLists.lists
      const index = lists.findIndex((list: any) => list.id === this.$route.params.listId)
      return index !== -1 ? lists[index].name : ''
    }
  },

  methods: {
    async deleteTaskList () {
      console.log(Object.keys(this))
      const success = await this.$store.dispatch('todoLists/remove', this.$route.params.listId)
      if (success) {
        
        this.$router.push('/')
      }
    },
    confirmDeleteTask () {

    },
    createTasklist () {
      this.$store.dispatch('todoLists/add', this.form.name)
      this.showModal(false)
    },
    showModal (show: boolean) {
      this.form.name = ''
      this.modalIsVisible = show
    },
    dateValue (date: Date) {
      if (!date) return { date: 'None', time: '' }
      const d = date.toLocaleString().split(', ')
      return { date: d[0], time: d[1] }
    },
    updateChecked (row: any) {
      if (row.completed) {
        row.completed = null
      } else {
        row.completed = new Date()
      }
    }
  }
})
</script>

<style lang="stylus">
  @import '~/assets/main.styl'

  .danger, .danger:hover {
    color: color-red
  }
</style>
