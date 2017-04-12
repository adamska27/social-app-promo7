const pg = require('pg');
const urlBD = 'postgres://postgres:1234@localhost:5432/promo7';

const getAll = (req, res) => {

  pg.connect(urlBD, (err, client, done) => {
    if (err) throw err;

    client.query('SELECT * FROM apprenants', (err, result) => {
      if (err) throw err;

      done();

      res.render('pages/usersList', {
        apprenants: result.rows
      });
    });
  });
};

const getOne = (req, res) => {
  pg.connect(urlBD, (err, client, done) => {
    if (err) throw err;

    client.query('SELECT * FROM apprenants WHERE id = $1', [req.params.id], (err, result) => {
      if (err) throw err;

      done();

      res.render('pages/user', {
        apprenant: result.rows,
      });
    });
  });
};


//A revoir probleme sur la route
const getUserProjects = (req, res) => {

  const projectUser = projects.filter( (project) => {
    return project.userId === Number(req.params.userId);
  });

  if(projectUser) {
    res.render('pages/userProjects', {
      projects: projectUser,
      userId: req.params.userId
    });
  } else {
    res.send(`Ce projet n'existe pas!!`);
  }
};

const postUser = (req, res) => {
  pg.connect(urlBD, (err, client, done) => {
    if (err) throw err;

    client.query('INSERT INTO apprenants VALUES ($1, $2)', [req.body.firstname, req.body.lastname], (err, result) => {
      if (err) throw err;

      done();

      res.render('pages/added', {result: result.rows});
    });
  });
};

const deleteUser = (req, res) => {
  const userId = Number(req.params.id);

  pg.connect(urlBD, (err, client, done) => {
    if(err) throw err;

    client.query('DELETE FROM apprenants WHERE id = $1', [userId], (err, result) => {
      if(err) throw err;

      done();

      res.render('pages/deleted', {user: result.rows});
    });
  });
};

const putUser = (req, res) => {
  const userId = Number(req.params.id);

  pg.connect(urlBD, (err, client, done) => {
    if(err) throw err;
    client.query('UPDATE apprenants SET firstname = $1, lastname = $2 WHERE id = $3', [req.body.firstname, req.body.lastname, userId], (err, result) => {
      if(err) throw err;

      done();

      res.render('pages/updated');
    });
  });
};

module.exports = {
  getAll,
  getOne,
  getUserProjects,
  postUser,
  deleteUser,
  putUser
};
