import * as fs from "fs";

const file = "./db/data.json";

export const saveInfo = (data) => {

    fs.writeFileSync(file, JSON.stringify(data));

}

export const readInfo = () => {

    if (!fs.existsSync(file)) {
        return null;
    }

    const info = fs.readFileSync(file, { encoding: "utf-8" });
    try {
        const data = JSON.parse(info);
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }

} 