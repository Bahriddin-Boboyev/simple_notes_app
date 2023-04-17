// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const id1 = req.query.id;
  switch (req.method) {
    case "GET":
      const data = fs.readFileSync(
        path.join(process.cwd(), "notes", "note.json"),
        "utf8"
      );
      res.status(200).json(JSON.parse(data));
      break;
    case "POST":
      const name = req.body.name;
      const description = req.body.description;
      const Name = {
        id: Date.now(),
        name: name,
        description: description,
      };
      if (name.length) {
        let database = [];
        try {
          const data = fs.readFileSync(
            path.join(process.cwd(), "notes", "note.json"),
            "utf8"
          );
          database = JSON.parse(data);
        } catch (error) {
          console.error(error);
        }
        database.push(Name);
        try {
          fs.writeFileSync(
            path.join(process.cwd(), "notes", "note.json"),
            JSON.stringify(database)
          );
        } catch (error) {
          console.error(error);
        }
        res.status(200).json(Name);
      } else {
        res.status(400).json("title yoki description bo'sh");
      }
      break;
    case "DELETE":
      try {
        const data = fs.readFileSync(
          path.join(process.cwd(), "notes", "note.json"),
          "utf8"
        );

        const database = JSON.parse(data);
        const updatedDB = database.filter((item) => item.id !== parseInt(id1));

        fs.writeFileSync(
          path.join(process.cwd(), "notes", "note.json"),
          JSON.stringify(updatedDB)
        );
        console.log("render");
        res.status(200).json({ message: "Note muaffaqiyatli o'chirildi" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Note o'chirib bo'lmadi" });
      }
      break;

    case "PATCH":
      const nameUp = req.body.name;
      const descriptionUp = req.body.description;
      let database2;
      if (nameUp.length) {
        try {
          let data = fs.readFileSync(
            path.join(process.cwd(), "notes", "note.json"),
            "utf8"
          );
          data = JSON.parse(data);
          let newData = data.map((item) => {
            if (item.id == id1) {
              console.log(item.id, id1);
              return {
                id: item.id,
                name: nameUp ? nameUp : item.name,
                description: descriptionUp ? descriptionUp : item.description,
              };
            } else {
              return item;
            }
          });
          database2 = newData;
          console.log(database2);
        } catch (error) {
          console.error(error);
        }

        try {
          fs.writeFileSync(
            path.join(process.cwd(), "notes", "note.json"),
            JSON.stringify(database2)
          );
        } catch (error) {
          console.error(error);
        }
        res.status(200).json("Muaffaqiyatli yangilandi");
      } else {
        res.status(400).json("title yoki description bo'sh");
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
