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






// const Firestore = require('@google-cloud/firestore');

// const db = new Firestore({
//   projectId: 'patient-artisan-app',
//   keyFilename: '../serviceAccountKey.json',
// });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {

//   response.send("hello world");

// });

// exports.randnum = functions.https.onRequest((request, response) => {
//     const num = Math.round(Math.random() * 100);
//     response.send(num.toString());
// });

// var options = {
//     pageSize: 15,
//     finite: true
//   };
// var paginator = new FirebasePaginator(ref, options);

// exports.delItems = functions.https.onCall(async (request, response) => {
//   var adel = db.collection('Students').where('Age', '<', 18).limit(1);
//   const querySnapshot = await adel.get();
//   // console.log(querySnapshot)
//   querySnapshot.forEach((doc) => {
//     doc.ref.delete();
//   });
//   // await firebase_tools.firestore
//   //   .delete(db.collection('Students').where('Age', '<', 18).limit(1));
// });





// exports.onUserDeleted = functions.database.ref('/Students/').onDelete((Students) => {
//   const collectionRef = db.collection(Student).where('Age', '<', 18);
//   return collectionRef.get()
//   .then(qs => {
//      qs.forEach(docSnapshot => {
//        docSnapshot.ref.delete();
//      });
//   })
//   .catch(error => {
//       console.log(error);
//   });
// });




// exports.delItems =functions.https.onRequest((request, response) => {
//     var data= db.collection('Students').where('Age','<',18);
//     response.send(data);
// })


// async function deleteCollection(db, collectionPath, batchSize) {
// async function deleteQueryBatch(db, query, resolve) {
//   const snapshot = await query.get();

//   const batchSize = snapshot.size;
//   if (batchSize === 0) {
//     // When there are no documents left, we are done
//     resolve();
//     return;
//   }

//   // Delete documents in a batch
//   const batch = db.batch();
//   snapshot.docs.forEach((doc) => {
//     batch.delete(doc.ref);
//   });
//   await batch.commit();

//   // Recurse on the next process tick, to avoid
//   // exploding the stack.
//   process.nextTick(() => {
//     deleteQueryBatch(db, query, resolve);
//   });
// }
//   const collectionRef = db.collection(collectionPath);
//   const query = collectionRef.orderBy('__name__').limit(batchSize);

//   return new Promise((resolve, reject) => {
//     deleteQueryBatch(db, query, resolve).catch(reject);
//   });
// }



