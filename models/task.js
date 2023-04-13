import { v4 as uuidv4 } from 'uuid';

export default class Task {

    id = "";
    description = "";
    finishedDate = new Date();

    constructor(description) {
        this.id = uuidv4();
        this.description = description;
        this.finishedDate = null;
    }

}
