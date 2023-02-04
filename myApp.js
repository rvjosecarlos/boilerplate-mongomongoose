//const { MONGO_URI } = require('dotenv').config().parsed;
const mongoose = require('mongoose');

const MONGO_URI = process.env['MONGO_URI'];
console.log(MONGO_URI);

mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Creacion del ESQUEMA (Descripcion de los 'documentos' que se almacenaran en la coleccion)
let personSchema = new mongoose.Schema( {
  name: {
    type: String,
    require: true,
    lowercase: true
  },
  age: {
    type: Number,
    require: true
  },
  favoriteFoods: {
    type: [String],
    require: true
  }
});

// Se crea un modelo para poder acceder a los metods de crear, consultar, eliminar, actualizar...
let Person = mongoose.model( 'Person', personSchema );
console.log(Person);

const createAndSavePerson = (done) => {

  // Crea una instancia del modelo que basicamente es un objeto que accedera al metodo .save()
  const person = new Person({
    name: 'Carlos',
    age: 35,
    favoriteFoods: ['Pizza', 'Hamburguesas', 'Tacos']
  });

  // El objeto instanciado es el documento que sera agregado a la coleccion con el metodo .save()
  person
    .save()
    .then( documento => console.log(documento) )
    .catch( error => console.log(error) );

};


// Agrega muchos documentos de tipo persona a la coleccion
const createManyPeople = (arrayOfPeople, done) => {

  // Se pueden ingresar varios datos de inicio a la coleccion con Modelo.Create( arrDeObjs, callback )
  const promesaInsertar = Person.create( arrayOfPeople, (error, data)=>{
    if( error ){
      return done( error );
    }else{
      return done( null, data );
    };
  });

  promesaInsertar
    .then( resultado => console.log(resultado) )
    .catch( error => console.log(error) );

};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
