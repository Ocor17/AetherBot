
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

async function register(
  discord_id,
  discord_name,
  createdTimestamp,
  registrationID
){
  const existsRef = await database.collection(USERS_COLLECTION).where("discord_id", "==",discord_id).get();
  console.log(existsRef.empty);
  if( existsRef.empty){

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

    return true;
  }
  else{
    return false;
  }
}

async function isUnique(registrationID){
  const snapshot = database.collection(USERS_COLLECTION);
  const query = snapshot
    .where("registrationID", "==", registrationID);

  const querySnapshot = await query.get();
  //const data = querySnapshot.data();

  //console.log(querySnapshot);

  //console.log(snapshot);
  return !querySnapshot.empty;

}

module.exports = {
  addOrder,
  register,
  isUnique
};