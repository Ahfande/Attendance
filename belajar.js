// Testing
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/tes', (req, res) => {
      res.send('INI TESTING BANG WKWKWK')
  })
  
  app.put('/username', (req, res) => {
      console.log({UpdateUsername: req.body})
      res.send('Username berhasil di update')
  })
  
  app.post('/login', (req, res) => {
      console.log({ requestFromOutside : req.body})
      res.send('LOGIN BERHASIL BANG')
  })