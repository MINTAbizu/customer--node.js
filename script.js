// const { json } = require("express");
//read or list operation
function customerlist(){
    const userdiv=document.getElementById("data");
    userdiv.innerHTML=" ";
   
    fetch("http://localhost:2005/customerdata")
    .then((res)=>json())
    .then((data)=>{
       data.map((customer,i)=>{
           userdiv.innerHTML +=`
           <div>
           <h2>${customer.id} </h2>
           <h2>${customer.name} </h2>
           <h2>${customer.address} </h2>
           <h2>${customer.company} </h2>
           
         </div>  <hr>`
   
   
       });
    });
   
   }
   document.getElementById("list").addEventListener("click",customerlist);
   
   
   
   //////list data from  data base 
   function customerlist(){
     const userdiv=document.getElementById("data")
     userdiv.innerHTML=" "
   
     fetch("http://localhost:2005/customerdata")
     .then((res)=>json())
     .then((data)=>{
       data.map((customer,i)=>{
         userdiv.innerHTML +=`
   
         <div>
         <h2>${customer.id} </h2>
         <h2>${customer.name} </h2>
         <h2>${customer.address} </h2>
         <h2>${customer.company} </h2>
         
       </div>  <hr>
         `
       })
   
     })
   
   }
   document.getElementById("list").addEventListener("click",customerlist)
   
   
   
   
   
   // update
   
   function updatename(e){
     e.preventDefault();
   
   
     fetch("http://localhost:2005/update",{
       method:"put",
       headers:{"content-type":"application/json"},
       body:json.stringify({
         id:document.querySelector("#updateform input[name=id]").value,
         newname:document.querySelector("input[name=newname] ").value,
       }),
   
     })
     .then((response)=> response.json())
      .then(()=>alert("name updated"));
   
      document.getElementById("updateform").reset();
   
   }
   document.getElementById("updateform").addEventListener( "submit",updatename);
   
   
   

   function deleteuserform(e){
    e.preventDefault()

    const deleteuser=document.querySelector("#deleteforum input[name=delete]")
    const deleteid=deleteuser.value

    if(isNaN(deleteid) || deleteid==0){
        deleteuser.style.backroundcolor="pink"
        deleteuser.style.border="red"
    }else{
        deleteuser.style.backroundcolor=" "
        deleteuser.style.border=""
    }

    fetch("localhost:2121/delete",{
        method:"delete",
        headers:{"content-type":"application/json"},
        body:json.stringfy({
            id:deleteuser
        })
    }).then((res)=>res.json())
    .then(alert("user deleted"))
    document.getElementById("delete").reset()


}
document.getElementById("delete").addEventListener("click".deleteuserform)