const express = require(`express`)
const path = require(`path`)
const app = express()
const port = 3000
const api = require(`./server/routers/api`)
const mongoose = require(`mongoose`)


mongoose.connect(process.env.MONGODB_URL || `mongodb://localhost/expensesDB` , { useNewUrlParser: true } )

app.use(express.json())
app.use(express.urlencoded( {extended : true} ))
app.use(express.static(path.join(__dirname , `node_modules`)))
app.use(express.static(path.join(__dirname , `dist`)))
app.use(`/` , api)


app.listen(process.env.port || port , function () {
    console.log(`Server running on port ${port}`)
})