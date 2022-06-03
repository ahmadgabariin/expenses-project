class ExpenseManager {

    constructor () {
        this.expenses = []

    }

    addExpense (expense) {
        return $.ajax ({
            url : `/expense`,
            type : `POST` ,
            data : expense ,
        })
        
      
    }

    getExpenses () {
        
        $.ajax({
            url : `/expenses` ,
            type : `Get` ,
            success : (expenses) => {
                this.expenses = expenses
                console.log(this.expenses)
            } ,
            error : (error) => {
                console.log(error)
            }
            
        })

    }

}