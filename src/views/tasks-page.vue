<template>
  <div class="tasks-page">

    <modal-add-task
        v-model:visibility="modalVisibility.addTask"
        :newTaskId="nextId"
        @addTask="addNewTask"
    />
    <modal-edit-task
        v-model:visibility="modalVisibility.editTask"
        :currentTask="findTaskById(idCurrentModal)"
        @editTask="editTask"
    />
    <modal-delete-task
        v-model:visibility="modalVisibility.deleteTask"
        :taskId="idCurrentModal"
        @deleteTask="deleteTask"
    />

    <div @click="openAddModal" class="add-task cursor-pointer unselectable">
      Добавить задачу
    </div>

    <div
        v-for="task in tasks"
        :key="`task${task.id}`"
        class="task unselectable"
    >

      <div class="task-main">
        <div @click="openTask(task.id)" class="task-left cursor-pointer">

          <span :class="task.done ? 'line-through' : ''">
            {{ task.title }}
          </span>

          <i class="task-open-icon fas fa-chevron-down"></i>
        </div>

        <div class="task-right">

          <div @click="checkTask(task.id)" :class="task.done ? 'checked' : ''" class="task-check cursor-pointer">
            <i class="fa-solid fa-check"></i>
          </div>

          <div
              @click="openOptions(task.id)"
              class="tasks-options cursor-pointer"
              :id="`taskOptions${task.id}`"
          >
            <i class="fa-solid fa-ellipsis-vertical" :id="`taskOptionsIcon${task.id}`"></i>

            <div v-show="task.optionsOpened" class="tasks-options-list">
              <div @click="openEditModal(task.id)" class="edit-task cursor-pointer">
                Редактировать
              </div>
              <div @click="openDeleteModal(task.id)" class="delete-task cursor-pointer">
                Удалить
              </div>
            </div>

          </div>

        </div>
      </div>

      <div v-show="task.opened" class="task-additional">
        <div>
          Описание: {{ task.desc }}
        </div>
        <div v-if="task.time !== ''">
          Время на выполнение: {{ task.time }}
        </div>
        <div v-else>
          Время на выполнение: не указано
        </div>
        <sub-tasks :tasks="task.subTasks" :taskId="task.id"/>
      </div>

      </div>

  </div>
</template>

<script>
import ModalAddTask from "@/components/modals/ModalAddTask";
import ModalEditTask from "@/components/modals/ModalEditTask";
import ModalDeleteTask from "@/components/modals/ModalDeleteTask";
import SubTasks from "@/components/SubTasks";

import {mapActions} from 'vuex'

export default {
  name: 'tasks-page',

  components: {SubTasks, ModalEditTask, ModalAddTask, ModalDeleteTask},

  data() {
    return {
      modalVisibility: {
        addTask: false,
        editTask: false,
        deleteTask: false,
      },
      idCurrentModal: 1,
    }
  },

  created() {
    window.addEventListener('click', this.popupListener, false)
    this.tasks.forEach((task) => {
      task.opened = false
      task.optionsOpened = false
    })
  },

  unmounted() {
    window.removeEventListener('click', this.popupListener, false)
  },

  computed: {
    tasks() {
      return this.$store.state.tasks.tasks.filter(task => !task.deleted)
    },
    nextId() {
      return this.$store.state.tasks.tasks.length + 1
    },
  },

  methods: {

    ...mapActions({
      addNewTask: "tasks/addNewTask",
      editTask: "tasks/editTask",
      deleteTask: "tasks/deleteTask",
      checkTask: "tasks/checkTask",
    }),

    popupListener(event) {
      this.tasks.forEach((task) => {
        if (document.getElementById(`taskOptions${task.id}`) === event.target ||
            document.getElementById(`taskOptionsIcon${task.id}`) === event.target) {
          return undefined
        } else {
          task.optionsOpened = false
        }
      })
    },

    openAddModal() {
      this.modalVisibility.addTask = true
    },

    openEditModal(id) {
      const task = this.findTaskById(id)
      this.idCurrentModal = task.id
      this.modalVisibility.editTask = true
    },

    openDeleteModal(id) {
      const task = this.findTaskById(id)
      this.idCurrentModal = task.id
      this.modalVisibility.deleteTask = true
    },

    openTask(id) {
      const task = this.findTaskById(id)
      task.opened = !task.opened
    },

    openOptions(id) {
      const task = this.findTaskById(id)
      task.optionsOpened = !task.optionsOpened
    },

    findTaskById(id) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
          return this.tasks[i]
        }
      }
    }

  }
}
</script>

<style>

</style>