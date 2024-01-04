
const database = require('./FirebaseSetup');

const ORDER_COLLECTION = 'orders';
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

module.exports = {
  addOrder,
};