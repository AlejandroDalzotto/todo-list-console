import "colors";
import inquirer from 'inquirer';

const questions = [
    {
        type: 'list',
        name: "option",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: "1",
                name: "1. Crear tarea"
            },
            {
                value: "2",
                name: "2. Listar tareas"
            },
            {
                value: "3",
                name: "3. Listar tareas completadas"
            },
            {
                value: "4",
                name: "4. Listar tareas pendientes"
            },
            {
                value: "5",
                name: "5. Completar tarea(s)"
            },
            {
                value: "6",
                name: "6. Borrar tarea"
            },
            {
                value: "0",
                name: "0. Salir"
            },
        ],
    }
];

export const inquirerMenu = async () => {

    console.clear();

    console.log("=========================".green);
    console.log("  Seleccione una opción  ");
    console.log("=========================\n".green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

export const pause = async () => {

    const question = [
        {
            type: 'input',
            name: "question",
            message: `Presione ${"ENTER".green} para continuar.`,
        }
    ];

    return inquirer.prompt(question);
}

export const readInput = async (message) => {

    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                return value.length === 0 ? "Por favor ingrese un valor" : true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

export const listTaskDelete = async (tasks = []) => {

    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    })

    choices.unshift({
        value: 0,
        name: "0. ".green + "Cancelar"
    })
    const qtns = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices
        }
    ];

    const { id } = await inquirer.prompt(qtns);
    return id;
}

export const listTaskToComplete = async (tasks = []) => {
    const choices = tasks.map(task => {
        return {
            value: task.id,
            name: `${task.description}`,
            checked: task.finishedDate ? true : false,
        }
    });

    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);
    return ids;
}