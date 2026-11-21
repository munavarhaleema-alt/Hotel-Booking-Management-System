const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// MYSQL CONNECTION

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Hotel@123",
    database: "hotel_db"

});



db.connect((err) => {

    if(err){

        console.log(err);

    }else{

        console.log("Connected to MySQL");

    }

});




// INSERT OPERATION

app.post('/book', (req, res) => {

    const {

        name,
        room_type,
        rooms_available,
        staying_days,
        leaving_date,
        amount_per_day,
        total_amount,
        booking_date

    } = req.body;



    db.query(

        "INSERT INTO bookings(name, room_type, rooms_available, staying_days, leaving_date, amount_per_day, total_amount, booking_date) VALUES(?,?,?,?,?,?,?,?)",

        [
            name,
            room_type,
            rooms_available,
            staying_days,
            leaving_date,
            amount_per_day,
            total_amount,
            booking_date
        ],

        (err, result) => {

            if(err){

                console.log(err);

                res.send(err);

            }else{

                console.log("\nINSERT SUCCESS\n");

                db.query("SELECT * FROM bookings", (err, data) => {

                    console.log("\nTABLE DATA\n");

                    console.log(data);

                });

                res.send("Booking Added Successfully");

            }

        }

    );

});




// SELECT OPERATION

app.get('/view', (req, res) => {

    db.query("SELECT * FROM bookings", (err, result) => {

        if(err){

            console.log(err);

            res.send(err);

        }else{

            console.log("\nSELECT SUCCESS\n");

            console.log("\nTABLE DATA\n");

            console.log(result);

            res.json(result);

        }

    });

});




// UPDATE OPERATION

app.put('/update/:id', (req, res) => {

    const id = req.params.id;

    const {

        name,
        room_type,
        rooms_available,
        staying_days,
        leaving_date,
        amount_per_day,
        total_amount,
        booking_date

    } = req.body;



    db.query(

        "UPDATE bookings SET name=?, room_type=?, rooms_available=?, staying_days=?, leaving_date=?, amount_per_day=?, total_amount=?, booking_date=? WHERE id=?",

        [
            name,
            room_type,
            rooms_available,
            staying_days,
            leaving_date,
            amount_per_day,
            total_amount,
            booking_date,
            id
        ],

        (err, result) => {

            if(err){

                console.log(err);

                res.send(err);

            }else{

                console.log("\nUPDATE SUCCESS\n");

                db.query("SELECT * FROM bookings", (err, data) => {

                    console.log("\nTABLE DATA\n");

                    console.log(data);

                });

                res.send("Updated Successfully");

            }

        }

    );

});




// DELETE OPERATION

app.delete('/delete/:id', (req, res) => {

    const id = req.params.id;



    db.query(

        "DELETE FROM bookings WHERE id=?",

        [id],

        (err, result) => {

            if(err){

                console.log(err);

                res.send(err);

            }else{

                console.log("\nDELETE SUCCESS\n");

                db.query("SELECT * FROM bookings", (err, data) => {

                    console.log("\nTABLE DATA\n");

                    console.log(data);

                });

                res.send("Deleted Successfully");

            }

        }

    );

});




// SERVER

app.listen(3000, () => {

    console.log("Server running on port 3000");

});