const pg = require('pg');
const Pool = pg.Pool;

// by default the pool will use the same environment variables
// as psql, pg_dump, pg_restore etc:
// https://www.postgresql.org/docs/9.5/static/libpq-envars.html

// you can optionally supply other values
const config = {
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'promo7',
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack);
})

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
const pool = new Pool(config);


// const urlBD = 'postgres://postgres:1234@localhost:5432/promo7';

const getAll = (req, res) => {
    pool.query('SELECT * FROM apprenants', (err, result) => {
      if (err) throw err;

      res.render('usersPages/usersList', {
        apprenants: result.rows
      });
    });
};

const getOne = (req, res) => {

    pool.query('SELECT * FROM apprenants WHERE id = $1', [req.params.id], (err, result) => {
      if (err) throw err;

      res.render('usersPages/user', {
        apprenant: result.rows,
        id: req.params.id,
      });
    });
};

const getSpecificUser = (req, res) => {
  const search = req.query.search;

    pool.query('SELECT * FROM apprenants where firstname = $1', [search], (err, result) => {
      if (err) throw err;

      if (result.rows.length > 0) {
        res.render('usersPages/searchResults',{ apprenants: result.rows});
      } else {
        res.render('usersPages/noSearchResults');
      }
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

    pool.query('INSERT INTO apprenants VALUES ($1, $2)', [req.body.firstname.toLowerCase(), req.body.lastname.toLowerCase()], (err, result) => {
      if (err) throw err;

      res.render('usersPages/added',
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
    });
};

const deleteUser = (req, res) => {
  const userId = Number(req.params.id);

    pool.query('DELETE FROM apprenants WHERE id = $1', [userId], (err, result) => {
      if(err) throw err;

      res.render('usersPages/deleted',
      {
        user: result.rows,
        id: userId
      });
    });
};

const putUser = (req, res) => {
  const userId = Number(req.params.id);

    pool.query('UPDATE apprenants SET firstname = $1, lastname = $2 WHERE id = $3', [req.body.firstname, req.body.lastname, userId], (err, result) => {
      if(err) throw err;

      res.render('usersPages/updated',
      {
        firstname: req.body.firsname,
        lastname: req.body.lastname,
        id: userId
      });
    });
};

const postProject = (req, res) => {
    pool.query('INSERT INTO projects VALUES ($1, $2, $3, $4)', [req.body.name, req.body.githubrepo, req.body.githuburl, req.params.id], (err) => {
      res.send(req.body.name, req.body.githubrepo, req.body.githuburl, req.params.id);
    });
};


module.exports = {
  getAll,
  getOne,
  getSpecificUser,
  getUserProjects,
  postUser,
  deleteUser,
  putUser,
  postProject
};
