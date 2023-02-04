const { MONGO_URI } = require('dotenv').config().parsed;
const mongoose = require('mongoose');

//const MONGO_URI = process.env['MONGO_URI'];
console.log(MONGO_URI);

mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Creacion del ESQUEMA (Descripcion de los 'documentos' que se almacenaran en la coleccion)
let personSchema = new mongoose.Schema( {
  name: {
    type: String,
    require: true,
    //lowercase: true
  },
  age: {
    type: Number,
    //require: true
  },
  favoriteFoods: {
    type: [String],
    //require: true
  }
});

// Se crea un modelo para poder acceder a los metods de crear, consultar, eliminar, actualizar...
let Person = mongoose.model( 'Person', personSchema );
console.log(Person);

const createAndSavePerson = (done) => {

  // Crea una instancia del modelo que basicamente es un objeto que accedera al metodo .save()
  const person = new Person({
    name: 'Mary',
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
  const promesaInsertar = Person.create( arrayOfPeople );

  promesaInsertar
    .then( resultado => console.log(resultado) )
    .catch( error => console.log(error) );

};


// Buscar o consultar por propiedad de un objeto .find traera todas las coincidencias y devolvera un arreglo
const findPeopleByName = (personName, done) => {

  const objBuscado = {
    name: personName
  }

  const promesaBuscar = Person.find( objBuscado );

  promesaBuscar 
    .then( documento => console.log(`Documento consultado ${documento}`) )
    .catch( error => console.log(error) );
};


// Buscar o consultar por propiedad comida .findOne() traera solo la primera coincidencia
const findOneByFood = (food, done) => {
  
  const objBuscado = {
    favoriteFoods: food
  };

  Person.findOne( objBuscado )
    .then( documento => console.log(`Documento buscado ${documento}`) )
    .catch( error => console.log(error) );

};

// Buscar o consultar por el id del documento con .findById() traera solo la primera coincidencia
const findPersonById = (personId, done) => {

  const promesaBuscar = Person.findById( personId );

  promesaBuscar 
    .then( documento => console.log(documento) )
    .catch( error => console.log(error));

};

// Actualiza realizando el proceso de Buscar-Editar-Guardar
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Buscar
  const promesaBuscar = Person.findById( personId );

  promesaBuscar
    .then( documento => {
      const { favoriteFoods } = documento;
      // Actualiza
      favoriteFoods.push(foodToAdd);
      // Guarda... Se puede guardar desde el mismo documento ya que tiene acceso al metodo .save()
      documento.save();
    })
    .catch( error => error );
};

// Actualiza el documento con .findOneAndUpdate( objBuscado, {propiedadActualizar}, { retornaElNuevoDoc })
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  const objBuscado = {
    name: personName
  };

  const promesaActualizar = Person.findOneAndUpdate( objBuscado, { age: ageToSet }, { new: true });

  promesaActualizar
    .then( documento => console.log(documento) )
    .catch( error => error );                           
  
};

// Elimina un documento de la coleccion de Persona
const removeById = (personId, done) => {

  const promesaEliminar = Person.findByIdAndRemove( personId );

  promesaEliminar
    .then( respuesta => console.log(respuesta) )
    .catch( error => console.log(error) );

};

// Elimina muchos documentos con Model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Carlos";

  const promesaEliminar = Person.remove( { name:nameToRemove } );

  promesaEliminar
    .then( respuestaJSON => console.log(respuestaJSON) )
    .catch( error => console.log(error) );

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
