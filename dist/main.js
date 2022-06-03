let expenseManager = new ExpenseManager()
let expense = new Expense()
expenseManager.getExpenses()

$(`#btn-add-expense`).on(`click` , function () {
    let div = $(`#div-add-expense`)
    let itemName = div.children().eq(1).val()
    let itemAmount = div.children().eq(2).val()
    let itemGroup = div.children().eq(3).find(":selected").attr(`value`)
    let itemDate = div.children().eq(4).val()
    expense.item = itemName
    expense.amount = itemAmount
    expense.date = itemDate
    expense.group = itemGroup

    expenseManager.addExpense(expense)
    .then( response => console.log(response))
    .catch( error => console.log(error))
    
})