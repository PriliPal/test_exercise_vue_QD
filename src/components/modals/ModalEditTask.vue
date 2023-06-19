<template>
  <div v-show="visibility" class="modal-window" @click.stop="hideModal()">
    <div @click.stop class="modal-content">

      <div>

        <div>
          <input class="modal-inputs" @keyup.enter="saveTask()" v-model="task.title" type="text" placeholder="Название">
        </div>

        <div>
          <input class="modal-inputs" @keyup.enter="saveTask()" v-model="task.time" type="text" placeholder="Время">
        </div>

        <div>
          <input class="modal-inputs" @keyup.enter="saveTask()" v-model="task.desc" type="text" placeholder="Описание">
        </div>

      </div>

      <div>

        Добавить подзадачи

<!--        {{task.subTasks}}-->

        <div v-for="(subTask, index) in subTasks" :key="`subTask${subTask.id}InNewTask${currentTask}`">

          <div class="sub-task-label">
            <div>
              {{index + 1}}
            </div>
            <div @click="deleteSubTask(subTask.id)" class="sub-task-delete cursor-pointer">
              <i class="fa-regular fa-trash-can"></i>
            </div>
          </div>
          <div>
            <input class="modal-sub-inputs-title" v-model="subTasks[index].title" type="text" placeholder="Название">
            <input class="modal-sub-inputs-time" v-model="subTasks[index].time" type="text" placeholder="Время">
          </div>
        </div>

        <div v-if="task.subTasks !== undefined && subTasks.length < 5" class="add-subtask">

          <div @click="addSubTaskInputs()" class="add-subtask-button cursor-pointer">
            <i class="fa-solid fa-plus"></i>
          </div>

        </div>

      </div>

      <div class="choice">

        <div @click="saveTask()" class="save cursor-pointer unselectable">
          Сохранить
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
  name: "ModalEditTask",

  props: {
    visibility: {
      type: Boolean,
      default: false
    },
    currentTask: {
      type: Object
    }
  },

  data() {
    return {
      task: {},
      subTasks: []
    }
  },

  watch: {
    visibility() {
      // console.log(this.task ,this.currentTask)
      // eslint-disable-next-line no-undef
      this.task = _.cloneDeep(this.currentTask)

    },
    task: {
      handler() {
        this.subTasks = this.task.subTasks.filter(task => !task.deleted)
      },
      deep: true
    }
  },

  methods: {
    hideModal() {
      this.$emit('update:visibility', false)
    },

    saveTask() {
      let valid = true
      if (this.task.title === '') {
        valid = false
      }
      this.subTasks.forEach((task) => {
        if (task.title === '') {
          valid = false
        }
      })
      if (valid) {
        this.task.subTasks = this.subTasks
        this.$emit('editTask', this.task)
        this.hideModal()
      } else {
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
      this.subTasks.forEach((task) => {
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