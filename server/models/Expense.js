const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    item : String ,
    amount : Number ,
    group : String,
    date : Date 
})

const Expense = mongoose.model(`Expense` , expenseSchema ,`Expenses`)

module.exports = Expense