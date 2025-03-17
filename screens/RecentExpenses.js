import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext, useEffect, useState } from "react"
import { ExpensesContext } from "../store/expenses-content"
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";


function RecentExpenses  () {
  const expensesCtx = useContext(ExpensesContext);
// const [fetchedExpenses, setFetchedExpenses] = useState([])
  useEffect(() => {
    async function getExpenses(){

      const expenses = await fetchExpenses()
      expensesCtx.setExpenses(expenses)
      // setFetchedExpenses(expenses)
    }
    getExpenses()
  }, [])

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo 
  })

  return <ExpensesOutput expenses={recentExpenses} fallBackText='No expenses registered for the last 7 days' expensesPeriod='Last 7 Days'/>
}

export default RecentExpenses 