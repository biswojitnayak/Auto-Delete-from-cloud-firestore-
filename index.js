const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();


exports.artisanAllyDeleteCollections = functions.firestore
  .document('deleteCollections/{token}')
  .onCreate(async event => {

    try {
      console.log('delete students collection');
      // delete student collection
      while (true) {
        const optOutRef = db.collection('Students').where('Age', '<', 18).limit(1);
        const resultOptOut = await optOutRef.get();
        console.log(resultOptOut.docs.length, 'students');
        if (resultOptOut.docs.length > 0) {
          for (const resultOpt of resultOptOut.docs) {
            if (resultOpt.exists) {
              // optOutRef.doc(resultOpt.id).delete().then().catch()
              resultOpt.ref.delete().then().catch();
            }
            
          }
        }
        else {
          break;
        }
      }

    } catch (e) {
      console.log(e, 'artisanAllyDeleteCollections')
    }

    return true
  })



