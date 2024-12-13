const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const users = {
  username: "Ahfande",
  ID: "12345",
  password: "Pass123"
}

app.post('/Login', (req, res) =>{
  const { username, ID, password } = req.body
  
  const user = users.find(u => u.ID === ID);
  if(!user){
    res.status(404).send({ message: 'user not found'});
  }

  if(user.ID !== ID || user.password !== password){
    res.status(401).send({ message: 'Invalid ID or password'});
  }

  res.json({ message: 'Login Successfull' })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})