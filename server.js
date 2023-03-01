const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
var cookieParser = require('cookie-parser')

dotenv.config();

mongoose.connect(process.env.COMPASS_URL,
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false
    // }
)
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB Connection Successfull");
})

app.use(bodyParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 10000000 }));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.json())
app.use(express.json())

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use('/api', require("./controllers/property.controller"));
app.use('/api', require("./controllers/user_property.controller"));
app.use('/api', require("./controllers/amenities.controller"));
app.use('/api', require("./controllers/location.controller"));
app.use('/api', require("./controllers/developer.controller"));
app.use('/api', require("./controllers/unitType.controller"));
app.use('/api', require("./controllers/users.controller"));
app.use('/api', require("./controllers/blogs.controller"));
app.use('/api', require("./controllers/appraisals.controller"));
app.use('/api', require("./controllers/comments.controller"));
app.use('/api', require("./controllers/replies.controller"));
app.use('/api', require("./controllers/likes.controller"));
app.use('/api', require("./controllers/notifications.controller"));
app.use('/api', require("./controllers/contact.controller"));
app.use(cookieParser());

app.use("/api/file", require("./middleware/images"))

console.log(path.join(__dirname, "../Frontend/build"))
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'Frontend', 'build', 'index.html'))
    })

} else {
    app.get("/", (req, res) => {
        res.send("Api Running")
    })
}


const port = process.env.PORT || 5000

app.use(express.json())
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
});
