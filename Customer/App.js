const mysql=require("mysql")
const exppress=require("express")
const bodyparser=require("body-parser")


const app=exppress()
app.use(bodyparser.urlencoded({extended:true}))
app.use(exppress.json())


app.listen(2005,(err)=>{
   if(err){
    console.log(err)
   }else{
    console.log("server is running on port 2002")
   }
})



 var  mysqlconnection=mysql.createConnection({
    user:"company",
    password:"company",
    host:"localhost",
    database:"company"
  })
  
 mysqlconnection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("database  is created  and connected to server")
    }
})

 app.get("/company",(req,res)=>{
    let message="table is created"
    let customertable=`CREATE TABLE if not exists customer(
        customer_id int auto_increment,
        name varchar(255) not null,
        PRIMARY KEY(customer_id)
    
    )`;


    let addresstable=`CREATE TABLE if not exists address(
        address_id int auto_increment,
        customer_id int(11) not null,
        address varchar(255)not null,
        PRIMARY KEY(address_id),
        FOREIGN KEY(customer_id)  REFERENCES customer(customer_id)

    )`;

    let companytable=`CREATE TABLE if not exists company(
        company_id int auto_increment,
        customer_id int(11) not null,
        company varchar(255) not null,
        PRIMARY KEY(company_id),
        FOREIGN KEY(customer_id) REFERENCES  customer(customer_id)
    )`;


    mysqlconnection.query(customertable,(err,result,filed)=>{
        if(err){
            console.log(err)
        }
    })
    mysqlconnection.query(addresstable,(err,result,filed)=>{
        if(err){
            console.log(err)
        }
    });

    mysqlconnection.query(companytable,(err,result,filed)=>{
        if(err){
            if(err){
                console.log(err)
            }
        }
    })
 res.end(message)

});



app.post("/insert",(req,res)=>{



    let name=req.body.name
    let address=req.body.address
    let company=req.body.company

    let insercustomer="INSERT INTO customer(name) VALUES('"+name+"')"
    
    mysqlconnection.query(insercustomer,(err,result,filed)=>{
        if(err){
            console.log(err)
        }
    })
    let getmetheid="SELECT * FROM customer WHERE name = '"+ name+"'"
 mysqlconnection.query(getmetheid,(err,row,filed)=>{
    console.log(row)
   
    let customerid=row[0].customer_id
    console.log(customerid)


    if(customerid !=0){
        let insertaddress="INSERT INTO address(customer_id,address)  VALUES('"+ customerid+"','"+address+"') "

        
        let insertcompany="INSERT INTO company(customer_id,company)  VALUES('"+customerid+"','"+company+"')"
    

        mysqlconnection.query(insertaddress,(err,result,filed)=>{
            if(err){
                console.log(err)
            }
        })
        mysqlconnection.query(insertcompany,(err,result,filed)=>{
            if(err){
                console.log(err)
            }
        })
    }
 })
 
    



})
//to get all data from data base 
app.get("/givemedata",(req,res)=>{

    let selectthedata="SELECT * FROM  customer JOIN address JOIN company ON customer.customer_id=address.customer_id AND customer.customer_id=company.customer_id"

    mysqlconnection.query(selectthedata,(err,result,filed)=>{
        if(err){
            console.log(err)
        }else{
            res.end(result)
        }
    })

})

//to get some customized data from data base 

//list customize data

app.get("/customerdata",(req,res)=>{
    mysqlconnection.query("SELECT customer.customer_id AS id,customer.name,address.address,company.company FROM customer JOIN address JOIN company ON customer.customer_id =address.customer_id AND customer.customer_id=company.customer_id  ",
    (err,result,filed)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
       res.end(result) 
    
})
app.get("/listdata",(req,res)=>{
    mysqlconnection.query("SELECT customer.customer.id AS id, customer.name,address.address,company.company FROM    customer JOIN address JOIN company ON customer.customer_id=address.customer_id AND customer.customer_id=company.customer_id"),
    (err,result,filed)=>{
        if(err){
            console.log(err)
        }

    }

})
//update data
app.put("/update",(req,res)=>{
    const {newname,id}=req.body


    let updatename=`UPDATE customer SET  name=? WHERE
    customer_id=?`;

    mysqlconnection.query(updatename,[newname,id],(err,result,filed)=>{
        if(err){
            console.log(err)
        }
        res.end(result)

    });
   
})




