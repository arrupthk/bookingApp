const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./database');
const controller = require('./controller')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// synchronize the model with the database
sequelize.sync()
  .then(() => {
    console.log('Expense model synchronized with database');
  })
  .catch((error) => {
    console.error('Failed to synchronize Expense model with database', error);
  });

// Serve the booking.html file on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'booking.html'));

});

app.post('/bookings',controller.InsertData)

app.get('/bookings',controller.GetData)
app.get('/bookings/:id',controller.ByOneId)
app.delete('/bookings/:id', controller.DelUser);
app.put('/bookings/:id', controller.UpdateUser)

// Start the server

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });