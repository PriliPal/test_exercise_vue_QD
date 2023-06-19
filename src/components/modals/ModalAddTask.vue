<template>
  <div v-show="visibility" class="modal-window" @click.stop="hideModal()">
    <div @click.stop class="modal-content">

      <div>

        <div>
          <input class="modal-inputs" @keyup.enter="addTask()" v-model="task.title" type="text" placeholder="Название">
        </div>

        <div>
          <input class="modal-inputs" @keyup.enter="addTask()" v-model="task.time" type="text" placeholder="Время">
        </div>

        <div>
          <input class="modal-inputs" @keyup.enter="addTask()" v-model="task.desc" type="text" placeholder="Описание">
        </div>

      </div>

      <div>

        Добавить подзадачи

        <div v-for="(subTask, index) in newTask.subTasks" :key="`subTask${subTask.id}InNewTask${newTaskId}`">
          <div class="sub-task-label">
            <div>
              {{index + 1}}
            </div>
            <div @click="deleteSubTask(subTask.id)" class="sub-task-delete cursor-pointer">
              <i class="fa-regular fa-trash-can"></i>
            </div>
          </div>
          <div>
            <input class="modal-sub-inputs-title" v-model="newTask.subTasks[index].title" type="text" placeholder="Название">
            <input class="modal-sub-inputs-time" v-model="newTask.subTasks[index].time" type="text" placeholder="Время">
          </div>
        </div>

        <div v-if="newTask.subTasks !== undefined && newTask.subTasks.length < 5" class="add-subtask">

          <div @click="addSubTaskInputs()" class="add-subtask-button cursor-pointer">
            <i class="fa-solid fa-plus"></i>
          </div>

        </div>

      </div>

      <div class="choice">

        <div @click="addTask()" class="save cursor-pointer unselectable">
          Добавить
        </div>

        <div @click="hideModal()" class="cancel cursor-pointer unselectable">
          Отмена
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAddTask",

  props: {
    visibility: {
      type: Boolean,
      default: false
    },
    newTaskId: {
      type: Number,
    }
  },

  data() {
    return {
      task: {
        id: 0,
        title: '',
        desc: '',
        done: false,
        time: '',
        subTasks: [],
        opened: false,
        optionsOpened: false,
        deleted: false
      },
      newTask: {}
    }
  },

  watch: {
    visibility() {
      this.task.title = ''
      this.task.desc = ''
      this.task.time = ''
      this.task.subTasks = []
      this.task.id = this.newTaskId
      // eslint-disable-next-line no-undef
      this.newTask = _.cloneDeep(this.task)
    },

    task: {
      handler() {
        this.newTask.title = this.task.title
        this.newTask.desc = this.task.desc
        this.newTask.time = this.task.time
        this.newTask.subTasks = this.task.subTasks.filter(task => !task.deleted)
      },
      deep: true
    }
  },

  methods: {
    hideModal() {
      this.$emit('update:visibility', false)
    },
    addTask() {
      let valid = true
      if (this.newTask.title === '') {
        valid = false
      }
      this.newTask.subTasks.forEach((task) => {
        if (task.title === '') {
          valid = false
        }
      })
      if (valid) {
        console.log(this.newTask)
        this.$emit('addTask', this.newTask)
        this.hideModal()
      } else {
        console.log(this.newTask.subTasks)
        alert('Поля название обязательно должно быть заполнены')
      }

    },
    addSubTaskInputs() {
      this.task.subTasks.push({
        id: this.task.subTasks.length+1,
        title: '',
        done: false,
        time: '',
        deleted: false,
      })
    },
    deleteSubTask(id) {
      this.task.subTasks.forEach((task) => {
        if (task.id === id) {
          task.deleted = true
        }
      })
    }
  }
}
</script>

<style>

</style>