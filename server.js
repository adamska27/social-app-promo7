const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userController = require('./controllers/users');
const projectController = require('./controllers/projects');

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
usersRoutes.get('/search', userController.searchUser);
usersRoutes.get('/:id', userController.getOne);
usersRoutes.get('/:id/projects', projectController.getProjectsUser);
usersRoutes.get('/:id/projects/:idProject', userController.getOneProjectUser);
usersRoutes.post('/', userController.postUser);
usersRoutes.post('/:id', userController.deleteUser);
usersRoutes.post('/:id/modif', userController.putUser);
usersRoutes.post('/:id/project', projectController.postProject);
usersRoutes.post('/:id/projects/:idProject', projectController.deleteProject);

projectsRoutes.get('/', projectController.getAll);
projectsRoutes.get('/:idProject', projectController.getOne);

app.get('/addUser', (req, res) => {
  res.render('usersPages/form');
})
.get('/', function (req, res) {
  res.render('pages/home');
})
.get('*', (req, res) => {
  res.status(404).send(`Cette page n'existe pas!!! :(`);
});

app.listen(5000, () => {
  console.log('Le serveur écoute sur le port 5000!');
});
