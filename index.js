import {db , storage} from "./firebase.mjs"
import {  addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js "
import {ref, uploadBytes ,getDownloadURL,deleteObject } from " https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js "

const querySnapshot = await getDocs(collection(db, "todo"));
let post = document.getElementById('POST')


let butn = document.getElementById('show')



butn.addEventListener('click', async () => {

  let name = document.getElementById('title').value;
  let fname = document.getElementById('desc').value;
  let file = document.getElementById('file').files;
  // window.location.href = "/post.html"
  if(name!="" || fname !="" || file!=""){
  try {
    const docRef = await addDoc(collection(db, "todo"), {
      nam: name,
      last: fname,
      
    });
    alert("done")
    console.log("Document written with ID: ", docRef.id);
    
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
  const storageRef = ref(storage,"post");
  
  // 'file' comes from the Blob or File API
uploadBytes(storageRef, file[0]).then((snapshot) => {
  console.log('Uploaded a blob or file!');
  // console.log("Document written with ID: ", id)
  
  window.location.reload();
  
})
}
else{
  alert("please enter details")
}


})
querySnapshot.forEach((doc) => {
  post.style.display="block"
  post.innerHTML += `<h1> ${doc.data().nam}</h1> ${doc.data().last} <button onclick="update('${doc.id}')"> update </button> <button onclick="del('${doc.id}')">Delete </button> `;
  console.log(doc.data(),"data");
  getDownloadURL(ref(storage, "post"))
  .then((url) => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
  })
  .catch((error) => {
      console.log(error)
  });
  console.log(doc.id , "id");
  console.log(doc , "doc");
});


async function update(id){

 const updatelist = doc(db, "todo", id);
    var updatename = prompt( 'enter Title ')
    var updatetext = prompt('Enter your description')
    // Set the "capital" field of the city 'DC'
    await updateDoc(updatelist, {
      nam:updatename,
      last:updatetext
    }).then(()=>{

      window.location.reload();
    })

  }

  const del = async(id) =>{
    await deleteDoc(doc(db, "todo", id))
    
    .then(() => {
     window.location.reload();
 });

}
window.del=del;
window.update=update;




function deletes(){
// Create a reference to the file to delete
const desertRef = ref(storage, 'post');

// Delete the file
deleteObject(desertRef).then(() => {
  window.location.reload();
}).catch((error) => {
  // Uh-oh, an error occurred!
});
}
window.deletes=deletes









