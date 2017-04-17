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
        if (err)
            throw err;

        res.render('projectsPages/projectsList', {projects: result.rows});
    });
};

const getOne = (req, res) => {
    pool.query('SELECT * FROM projects WHERE id = $1', [req.params.idProject], (err, result) => {
        if (err)
            throw err;
        res.render('projectsPages/project', {
            project: result.rows[0],
            id: req.params.id,
            idProject: req.params.idProject
        });
    });
};

const postProject = (req, res) => {

    pool.query('INSERT INTO projects VALUES ($1, $2, $3, $4, $5)', [
        req.body.name, req.body.githubrepo, req.body.githuburl, req.body.description, req.params.id
    ], (err) => {
        if (err)
            throw err;

        res.render('projectsPages/added', {
            name: req.body.name,
            githubrepo: req.body.githubrepo,
            githuburl: req.body.githuburl,
            description: req.body.description,
            id: req.params.id
        });
    });
};

const getProjectsUser = (req, res) => {
    pool.query('SELECT * FROM projects WHERE userId = $1', [req.params.id], (err, result) => {
        if (err)
            throw err;
        if (result.rows.length > 0) {
            res.render('projectsPages/projectUserList', {
                projects: result.rows,
                id: req.params.id
            });
        } else {
            res.render('projectsPages/noProjectUser');
        }
    });
};

const deleteProject = (req, res) => {
    pool.query('DELETE FROM projects WHERE id = $1', [req.params.idProject], (err) => {
        if (err)
            throw err;
        res.render('projectsPages/deleted', {
            id: req.params.id,
            idProject: req.params.idProject
        });
    });
};

module.exports = {
    getAll,
    getOne,
    postProject,
    getProjectsUser,
    deleteProject
};
