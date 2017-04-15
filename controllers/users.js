const pg = require('pg');
const urlBD = 'postgres://postgres:1234@localhost:5432/promo7';

const getAll = (req, res) => {

  pg.connect(urlBD, (err, client, done) => {
    if (err) throw err;

    client.query('SELECT * FROM apprenants', (err, result) => {
      if (err) throw err;

      done();

      res.render('usersPages/usersList', {
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

      res.render('usersPages/user', {
        apprenant: result.rows,
        id: req.params.id,
      });
    });
  });
};

const getSpecificUser = (req, res) => {
  const search = req.query.search.toLowerCase();

  pg.connect(urlBD, (err, client, done) => {
    if (err) throw err;

    client.query('SELECT * FROM apprenants where firstname = $1', [search], (err, result) => {
      if (err) throw err;
      done();
      if (result.rows.length > 0) {
        res.render('usersPages/searchResults',{ apprenants: result.rows});
      } else {
        res.render('usersPages/noSearchResults');
      }
    });
  });
};


//A revoir probleme sur la route
const getUserProjects = (req, res) => {

  const projectUser = projects.filter( (project) => {
    return project.userId === Number(req.params.userId);
  });

  if(projectUser) {
    res.render('usersPages/userProjects', {
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

    client.query('INSERT INTO apprenants VALUES ($1, $2)', [req.body.firstname.toLowerCase(), req.body.lastname.toLowerCase()], (err, result) => {
      if (err) throw err;
      done();
      res.render('usersPages/added',
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
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

      res.render('usersPages/deleted',
      {
        user: result.rows,
        id: userId
      });
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
      console.log(userId);
      res.render('usersPages/updated',
      {
        firstname: req.body.firsname,
        lastname: req.body.lastname,
        id: userId
      });
    });
  });
};

module.exports = {
  getAll,
  getOne,
  getSpecificUser,
  getUserProjects,
  postUser,
  deleteUser,
  putUser
};
