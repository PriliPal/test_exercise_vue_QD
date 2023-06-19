<template>
  <div
      v-for="subTask in tasks"
      :key="`subTask${subTask.id}InTask${taskId}`"
      class="sub-task"
  >
    <div
        @click="check(subTask.id)"
        :class="subTask.done ? 'checked' : ''"
        class="sub-task-check cursor-pointer"
    >
      <i class="fa-solid fa-check"></i>
    </div>
    <div :class="subTask.done ? 'line-through' : ''">
      {{ subTask.title }} -
      <span v-if="subTask.time !== ''">{{ subTask.time }}</span>
      <span v-else>Не указано</span>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "SubTasks",

  props: {
    tasks: {
      type: Array
    },
    taskId: {
      type: Number
    }
  },

  methods: {
    ...mapActions({
      checkSubTask: 'tasks/checkSubTask'
    }),
    check(id) {
      let identifiers = {
        taskId: this.taskId,
        subTaskId : id
      }
      this.checkSubTask(identifiers)
    }
  }
}
</script>

<style scoped>

</style>