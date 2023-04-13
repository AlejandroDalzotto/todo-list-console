import Task from "./task.js";

export default class Tasks {

    _list = {};

    constructor() {
        this._list = {};
    }

    get listedTasks() {
        const arr = [];

        Object.keys(this._list).forEach(key => {
            arr.push(this._list[key]);
        });

        return arr;
    }


    createTask(description = "") {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    loadTasksFromDB(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    listComplete() {
        let list = "";
        Object.keys(this._list).forEach((task, idx) => {
            let line = "";
            if (this._list[task].finishedDate === null) {
                line = `${(idx + 1).toString().green}. ${this._list[task].description} :: ${"pendiente".red}\n`;
            } else {
                line = `${(idx + 1).toString().green}. ${this._list[task].description} :: ${"completada".green}\n`;
            }
            list += line;
        });

        return list;
    }

    sortCompletedTasks(complete = true) {
        let list = "";
        this.listedTasks.forEach((el, i) => {

            const idx = `${i + 1}.`.green;

            const { description, finishedDate } = el;
            const date = `${finishedDate}`.green;

            if (complete) {
                if (el.finishedDate) {
                    list += `${idx} ${description} :: ${date}\n`;
                }
            } else {
                if (!el.finishedDate) {
                    list += `${idx} ${description}\n`;
                }
            }
        });

        return list;

    }

    deleteTask(id = "") {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    toggleComplete(ids = []) {

        ids.forEach(id => {
            const task = this._list[id];
            if (!task.finishedDate) {
                task.finishedDate = new Date().toISOString();
            }
        });

        this.listedTasks.forEach(task => {

            if (!ids.includes(task.id)) {
                this._list[task.id].finishedDate = null;
            }
        });
    }
}