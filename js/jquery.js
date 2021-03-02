import regsterdb,{
  bulkcreate,getData,createEle
} from './module.js';

let db = regsterdb("Regsterdb",{
  paseengers:`++id,name,email,phone`
})

//input tags
const userid = document.getElementById("userid");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone")

//buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");

 
//insert value  using create btn

btncreate.onclick = (event)=>{

  let flag = bulkcreate(db.paseengers,{
    name:name.value,
    email:email.value,
    phone:phone.value

  })
  /*console.log(flag);*/
name.value = "";
email.value = "";
phone.value = "";

getData(db.paseengers,(data)=>{
  userid.value = data.id +1 || 1;
});
 
}

//create event on btn read button
btnread.onclick =table;

btnupdate.onclick=()=>{
  const id =parseInt( userid.value || 0)
  if(id){
    db.paseengers.update(id,{
      name: name.value,
      email:email.value,
      phone:phone.value

    }).then((update)=>{
      let get = updated?`data updated` :`couldn't updated data`
      console.log(get);
    })
  }
}


function  table(){
  const tbody = document.getElementById("tbody");

while(tbody.hasChildNodes()){
  tbody.removeChild(tbody.firstChild);
}


 getData(db.paseengers,(data)=>{
   if(data){

    createEle("tr",tbody,tr =>{
      for (const value in data) {
       
       createEle("td",tr,td=>{
         td.textContent = data[value];
       })

      }
      createEle("td",tr,td =>{
        createEle("i",td,i =>{
          i.className +="fas fa-edit btnedit"
          i.setAttribute(`data-id`, data.id);

          i.onclick = editbtn;
        })
      })
      createEle("td",tr,td =>{
        createEle("i",td,i =>{

        })
      })
    })
   }
 })
}
  
function editbtn(event){

  let id = parseInt(event.target.dataset.id);
  console.log(typeof id)
  db.paseengers.get(id,data =>{
    userid.value = data.id || 0;
    name.value  = data.name || "";
    email.value  = data.email || "";
    phone.value  = data.phone || "";
  })
}