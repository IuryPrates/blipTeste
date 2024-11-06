const routes = require("express").Router();
const githubApi = require("./apiGithub/githubApi");

routes.get("/repos", async (req, res) => {
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

module.exports = routes;