export default {
    namespaced: true,

    state() {
        return {
            tasks: [
                {
                    id: 1,
                    title: 'пропылесосить',
                    desc: 'во всех комнатах',
                    done: false,
                    time: 'в 2 часа дня',
                    subTasks: [
                        {
                            id: 1,
                            title: 'в туалете',
                            done: false,
                            time: '5 минут',
                            deleted: false,
                        },
                        {
                            id: 2,
                            title: 'в ванной',
                            done: false,
                            time: '5 минут',
                            deleted: false,
                        },
                        {
                            id: 3,
                            title: 'на кухне',
                            done: false,
                            time: '5 минут',
                            deleted: false,
                        }
                    ],
                    opened: false,
                    optionsOpened: false,
                    deleted: false
                },
                {
                    id: 2,
                    title: 'сходить в поликлиннику',
                    desc: 'сдать анализы',
                    done: false,
                    time: 'в четверг',
                    subTasks: [],
                    opened: false,
                    optionsOpened: false,
                    deleted: false
                },
                {
                    id: 3,
                    title: 'доделать курсовую',
                    desc: 'дописать практическую часть',
                    done: false,
                    time: 'до пятницы',
                    subTasks: [],
                    opened: false,
                    optionsOpened: false,
                    deleted: false
                },
            ]
        }
    },

    getters: {

    },

    mutations: {
        ADD_NEW_TASK(state, task) {
            state.tasks.push(task)
        },

        EDIT_TASK(state, task) {
            state.tasks[task.id-1] = task
        },

        DELETE_TASK(state, taskId) {
            state.tasks.forEach((task) => {
                if (task.id === taskId) {
                    task.deleted = true
                }
            })
        },

        CHECK_TASK(state, taskId) {
            state.tasks[taskId-1].done = !state.tasks[taskId-1].done
            if (state.tasks[taskId-1].done) {
                state.tasks[taskId-1].subTasks.forEach((subTask) => {
                    subTask.done = true
                })
            }
        },

        CHECK_SUB_TASK(state, identifiers) {
            state.tasks[identifiers.taskId-1].subTasks.forEach((task) => {
                if (task.id === identifiers.subTaskId) {
                    task.done = !task.done
                }
            })
        },

    },

    actions: {
        addNewTask(ctx, task) {
            ctx.commit('ADD_NEW_TASK', task)
        },

        editTask(ctx, task) {
            ctx.commit('EDIT_TASK', task)
        },

        deleteTask(ctx, taskId) {
            ctx.commit('DELETE_TASK', taskId)
        },

        checkTask(ctx, taskId) {
            ctx.commit('CHECK_TASK', taskId)
        },

        checkSubTask(ctx, identifiers) {
            ctx.commit('CHECK_SUB_TASK', identifiers)
        },
    }
}