const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(require('./src/routes'));

app.listen(port, function () {
  console.log("App Listen on port >> " + port);
});


//const routes = require("express").Router();
const githubApi = require("./src/apiGithub/githubApi");

app.get("/", async (req, res) =>{
  return res.json("Passou aqui");
});

app.get("/reposit", async (req, res) => {
  try {
    
    const { data } = await githubApi.get("/users/takenet/repos?&sort=created&direction=asc");
    const filtredValue = data.filter(repo => repo.language === 'C#').slice(0, 5);
    const buildJsonOutput = filtredValue.map(repo => ({
      title: repo.full_name,
      text: repo.description,
      type: "image/jpeg",
      uri: repo.owner.avatar_url
    }))

    // Adiciona id para cada registro objeto do repositorio
    const result = {};
    buildJsonOutput.map((repo, index) => {
      result[index] = repo;
    })
 
    res.status(200).json(result).end();

  } catch (error) {
    res.send({ error: error.message })
  }
});