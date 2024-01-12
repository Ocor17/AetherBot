
const database = require('./FirebaseSetup');

const ORDER_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

function addOrder(
  details,
  order_date,
  orderer,
  oderer_discord,
  ){

    database.collection(ORDER_COLLECTION).add({

      crafter:"",
      current_status:"ordered",
      details:details,
      order_date:order_date,
      orderer:orderer,
      orderer_discord:oderer_discord,
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}

function register(
  discord_id,
  discord_name,
  createdTimestamp,
  registrationID
){
  database.collection(USERS_COLLECTION).add({
    active:true,
    discord_id:discord_id,
    discord_name:discord_name,
    role:"user",
    created:createdTimestamp,
    auth_id:null,
    registrationID:registrationID,

  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}

function isRegistered(registrationID){
  return database.collection(USERS_COLLECTION).where("registrationID", "==", registrationID).get().exists;
}

module.exports = {
  addOrder,
  register,
  isRegistered
};