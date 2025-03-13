import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-content"


function AllExpenses  () {
  const expensesCtx = useContext(ExpensesContext)
  return <ExpensesOutput expenses={expensesCtx.expenses} fallBackText='No registered expenses found!'  expensesPeriod='Total'/>
}

export default AllExpenses
