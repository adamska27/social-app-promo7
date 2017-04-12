# js-express-first-server

#Ecrire 3 routes :

  1. GET / => 'Home Page'
  2. GET /users => 'liste d\'utilisateurs'
  3. GET /users/lenomdelutilisateur => 'le nom de l\'utilisateur'

  4. GET /users => renvois une vraie liste d'utilisateurs basé sur ce tableau

  ex. Michel, Osman, Tandi....

  const users = [
  {id:0, firstname:'Michel'},
  {id:1, firstname:'Osman'},
  {id:2, firstname:'Tandi'},
  {id:4, firstname:'Daniel'},
  {id:5, firstname:'Faustino'},
  {id:6, firstname:'Ijacques'},
  {id:7, firstname:'Paul'},
  {id:8, firstname:'Jojo'}
  ]

5. GET users/:id => renvoie le prénom de l'utilisateur qui a cet ID

6.Faire la même chose en html avec EJS

  ex. GET users, il faut renvoyer une liste html (<ul>, <li>...)

  ### references EJS :

  *http://ejs.co/
  *
