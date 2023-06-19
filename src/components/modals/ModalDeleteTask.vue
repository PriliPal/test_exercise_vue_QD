<template>
  <div v-show="visibility" class="modal-window" @click.stop="hideModal()">
    <div @click.stop class="modal-content">
      <div>
        Вы действительно хотите удалить эту задачу?
      </div>
      <div class="choice">
        <div @click="deleteTask(taskId)" class="delete cursor-pointer unselectable">
          Удалить
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
  name: "ModalDeleteTask",

  props: {
    visibility: {
      type: Boolean,
      default: false
    },
    taskId: {
      type: Number,
    }
  },

  methods: {
    hideModal() {
      this.$emit('update:visibility', false)
    },
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId)
      this.hideModal()
    }
  }
}
</script>

<style scoped>

</style>
