const BookingApp =require('./BookingApp.js')

function InsertData(req, res) {
    console.log(req.body, "here posting the data");
    if(!req.body.name ||!req.body.email||!req.body.date|| !req.body.time){
        console.log("error")
        return res.status(400).send({
            message:"Post not working, Bad Data"
        })
    }
    const Obj= {
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        time: req.body.time
    }
    BookingApp.create(Obj)
        .then(data => {
           // res.send(data);
            console.log("Data sent");
            res.redirect('/')
        })
        .catch(error => {
            res.status(500).send(error);
            console.log("Could not send the data");
        });
}

function GetData(req,res)
{
BookingApp.findAll()
.then(data=>{
    res.send(data)
})
.catch(error=>{
    res.status(500).send(error)
})

}


function ByOneId(req,res)
{
    const id = req.params.id;
    BookingApp.findByPk(id)
    .then(data => {
        if (!data) {
        res.status(404).send({ message: 'Id not found' });

    } else {
        res.send(data);
    }
    })
    .catch(error => {
    res.status(500).send(error);
    });
}
function DelUser(req, res) {
  const id = req.params.id;
  console.log('Deleting booking with ID:', id);
  BookingApp.findByPk(id)
  .then(bookings => {
    if (!bookings) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    console.log('Booking:', bookings);
    bookings.destroy()
    .then(() => {
      res.send({ message: 'Booking deleted successfully!' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Error deleting booking.' });
    });
  })
  .catch(error => {
    console.error(error);
    res.status(500).send({ message: 'Error finding booking.' });
  });
}

function UpdateUser(req,res)
{
  
  const id = req.params.id;
  const { name,email,date,time } = req.body;
  console.log(req.body, "request body"); // Add this line
  console.log(name,email,date,time, "received data"); // Add this line
  BookingApp.findByPk(id)
  .then(bookings => {
    if (!bookings) {
        console.log("user not found")
      res.status(404).send({ message: 'User not found' });
    } else {
        bookings.update({name,email,date,time }, { where: { id } })
        .then(updatedUser => {
            console.log("updated user", updatedUser)
          res.send(updatedUser);
          console.log("user updated")
        })
        .catch(error => {
          res.status(500).send(error);
        });
        console.log("options", " checking if data received or not");

    }
  })
  .catch(error => {
    res.status(500).send(error);
  });

}


module.exports= {InsertData,GetData,ByOneId,DelUser,UpdateUser}