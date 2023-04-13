import "colors";

import { inquirerMenu, pause, readInput, listTaskDelete, listTaskToComplete } from "./helpers/inquirer.js";
import Tasks from "./models/tasks.js";
import { saveInfo, readInfo } from "./helpers/dbManager.js"

const main = async () => {

    let option = "";
    const tasks = new Tasks();
    const persistedTasks = readInfo();

    if (persistedTasks) {
        tasks.loadTasksFromDB(persistedTasks);
    }

    do {
        option = await inquirerMenu();

        switch (option) {
            case "1":
                const desc = await readInput("Descripción: ");
                tasks.createTask(desc);
                break;
            case "2":
                console.log(tasks.listComplete());
                break;
            case "3":
                console.log(tasks.sortCompletedTasks(true));
                break;
            case "4":
                console.log(tasks.sortCompletedTasks(false));
                break;
            case "5":
                const ids = await listTaskToComplete(tasks.listedTasks);
                tasks.toggleComplete(ids);
                break;
            case "6":
                const id = await listTaskDelete(tasks.listedTasks);
                if (id !== 0) {
                    tasks.deleteTask(id);
                }
                break;
            case "0":

                break;
        }

        saveInfo(tasks.listedTasks);

        await pause();
    } while (option !== "0");


}

main();