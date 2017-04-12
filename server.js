const express = require('express');
const app = express();
const users = require('./data/users.js');
const projects = require('./data/projects.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userController = require('./controllers/users');

app.set('view engine', 'ejs');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

const usersRoutes = express.Router();
const projectsRoutes = express.Router();
const apiRoutes = express.Router();

app.use('/users', usersRoutes);
app.use('/projects', projectsRoutes);
app.use('/api', apiRoutes);

usersRoutes.get('/', userController.getAll);
usersRoutes.get('/:id', userController.getOne);
// usersRoutes.get('/:userId/projects', userController.getUserProjects);
usersRoutes.post('/', userController.postUser);
usersRoutes.delete('/:id', userController.deleteUser);
usersRoutes.put('/:id', userController.putUser);

projectsRoutes.get('/', (req, res) => {
    res.render('pages/projectsList', {
      projects: projects
    });
  })
  .get('/:id', (req, res) => {

    const project = projects.find( (project) => {
      return project.id === Number(req.params.id);
    });

    if (project) {
      res.render('pages/project', {
        projects : projects,
        id: req.params.id
      });
    } else {
      res.send(`Ce projet n'existe pas!!`);
    }
  });

  apiRoutes.get('/users', (req, res) => {
    res.send(JSON.stringify(users));
  })
  .get('/projects', (req, res) => {
    res.send(JSON.stringify(projects));
  });

  app.get('/form', (req, res) => {
    res.render('pages/form');
  });

  app.get('/', function (req, res) {
    res.render('pages/home');
  })
  .get('*', (req, res) => {
    res.status(404).send(`Cette page n'existe pas!!! :(`);
  });

app.listen(5000, () => {
  console.log('Le serveur écoute sur le port 5000!');
});
