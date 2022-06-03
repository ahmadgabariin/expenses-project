const express = require(`express`)
const router = express.Router()
const expensesData = require(`../../expenses-data-master/expenses.json`)
const Expense = require(`../models/Expense`)
const moment = require(`moment`)

// for (let expense of expensesData ) {
//     new Expense(expense).save()
// }




router.get(`/expenses/:group` , function (request , response) {
    const group = request.params.group
    const total = request.query.total

    if(total == `true`) {
        Expense.aggregate([
            {
                "$match" : {
                    "group" : group
                } 
            },
            {
                "$group" : {
                    "_id" : null ,
                    totalSpent : {"$sum" : "$amount"}
                }
            }
        ])
        .exec( function (erro , expenses) {
            response.send(expenses)
            response.end()
        } )
    }
    else {
        Expense.find({
        "group" : group
        })
        .exec( function(error , expnses) {
            response.send(expnses)
            response.end()
        } )
    }
})


router.get(`/expenses` , function (request , response ) {
    const dates = request.query
    let biggerDate 
    let secondDate

    if (dates.d1 && dates.d2) {
        const d1 = new Date(dates.d1)
        const d2 = new Date(dates.d2)
        
        if (d1 >= d2) {
            biggerDate = moment(d1).format(`LLLL`)
            secondDate = moment(d2).format(`LLLL`)
        }
        else {
            biggerDate = moment(d2).format(`LLLL`)
            secondDate = moment(d1).format(`LLLL`)
        }
        
        Expense.find ({
           "$and" : [
               {"date" : {"$gte" :secondDate }} ,
               {"date" : {"$lte" :  biggerDate}}
           ]
        })
        .sort({"date" : -1})
        .exec( function (erro , expenses) {
            response.send(expenses)
        } )

    }

    else if (dates.d1 && !dates.d2) {
       const d1 = new Date(dates.d1)
        biggerDate = moment().format(`LLLL`)
        secondDate = dates.d1

        Expense.find({
            "$and" : [
                {"date" : {"$gte" : secondDate}},
                {"date" : {"$lte" : biggerDate}}
            ]
        })
        .sort({"date" : -1})
        .exec( function (error , expenses) {
            response.send(expenses)
        } )
       
    } else {
        Expense.find({} , function (erro , expenses) {
            response.send(expenses)
        })

    }
} )

router.post(`/expense` , function (request , response) {
    const expense = request.body
    expense.date ? expense.date = moment(expense.date).format('LLLL') : expense.date = moment().format(`LLLL`)
    const newExpense = new Expense(expense)
    newExpense.save()
    .then( expense => 
        response.status(201).send(`The amount of the expense is : ${expense.amount}  and the name is : ${expense.item}  `) )

} )

router.put(`/update` , function (request , response) {
    const groups = request.body
    Expense.findOne({
        "group" : groups.group1
    })
    .exec( function(erro,expense) {
        expense.group = groups.group2
        expense.save()
        response.status(201).send( `The ${expense.item}'s group has been changed from ${groups.group1} to ${expense.group} `)
    } )
})



module.exports = router