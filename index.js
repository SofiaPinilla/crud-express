const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const cors = require('cors')

app.use(cors())
// app.get("/", (req, res) => {
//   res.send("Hola the bridge!!!");
// });

// app.get("/myName/:name", (req, res) => {
//   res.send("My name is " + req.params.name);
// });
// localhost:3000/myName/nombrequepaso

// app.get("/myName", (req, res) => {
//   res.send("My name is " + req.query.name);
// });
// localhost:3000/myName/?name=pedro

app.use(express.json()); //para que express entienda el req.body como objeto JSON

// app.post("/myName", (req, res) => {
//   res.send("My name is " + req.body.name);
// });
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','about.html'))
// })

// app.use(express.static(path.join(__dirname, 'public')));

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@gmail.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Shannon Jackson",
    email: "shannon@gmail.com",
    status: "active",
  },
];

app.get("/", (req, res) => {
  res.send(members);
});

app.get("/:id", (req, res) => {
  //con el + delante convertimos una string en un numero
  console.log(typeof +req.params.id);
  const found = members.some((member) => member.id === +req.params.id); // devuelve true o false
  console.log(found);
  if (found) {
    res.send(members.filter((member) => member.id === +req.params.id));
  } else {
    res.status(404).send(`Member with id ${req.params.id} not found`);
  }
});

app.post("/", (req, res) => {
  const newMember = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "inactive",
  };
  if (!req.body.name || !req.body.email) {
    res.status(400).send("Please enter all fields");
  } else {
    members.push(newMember);
    const response = { newMember, members }
    res.status(201).send(response);
  }
});

app.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === +req.params.id)
    if(found){
        members.forEach(member =>{
            if(+req.params.id === member.id){
                member.name = req.body.name ? req.body.name : member.name
                member.email = req.body.email ? req.body.email : member.email
                res.send(member)
            }
        })
    }else{
        res.status(404).send(`Member with id ${req.params.id} not found`)
    }
})

app.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === +req.params.id)

    if(found){
        const membersFiltered = members.filter(member => member.id !== +req.params.id)
        res.send({msg:`Member with id ${req.params.id} a la porra`,membersFiltered})
    }else{
        res.status(404).send(`Member with id ${req.params.id} not found`)
    }
})
app.listen(port, () => console.log(`servidor levantado en el puerto ${port}`));
