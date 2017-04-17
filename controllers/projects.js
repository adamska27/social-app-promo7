const pg = require('pg');
const Pool = pg.Pool;

const config = {
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'promo7'
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack);
});

const pool = new Pool(config);

const getAll = (req, res) => {
  pool.query('SELECT * FROM projects', (err, result) => {
    if (err) throw err;

    res.render('projectsPages/projectsList', {
      projects: result.rows
    });
  });
};

const getOne = (req, res) => {
  pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id], (err, result) => {
    if (err) throw err;

    res.render('projectsPages/project', {project: result.rows[0]});
  });
};

module.exports = {
  getAll,
  getOne,
};
