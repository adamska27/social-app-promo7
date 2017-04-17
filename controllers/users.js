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

const searchUser = (req, res) => {
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

const getOneProjectUser = (req, res) => {
  pool.query('SELECT * FROM projects WHERE id = $1', [req.params.idProject], (err, result) => {
    if (err) throw err;
    res.render('projectsPages/projectUser',
    {
      project: result.rows[0],
      id: req.params.id,
      idProject: req.params.idProject
    });
  });
};

module.exports = {
  getAll,
  getOne,
  searchUser,
  postUser,
  deleteUser,
  putUser,
  getOneProjectUser
};
