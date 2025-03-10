import { FlatList, StyleSheet, Text, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"

const DUMMY_EXPENSES = [
    {
        id:'e1',
        descr:'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id:'e2',
        descr:'A pair of shoes',
        amount: 69.99,
        date: new Date('2021-12-19')
    },
    {
        id:'e3',
        descr:'A pair of shoes',
        amount: 79.99,
        date: new Date('2021-12-19')
    },
    {
        id:'e5',
        descr:'A pair of shoes',
        amount: 89.99,
        date: new Date('2021-12-19')
    },
    {
        id:'e6',
        descr:'A pair of shoes',
        amount: 99.99,
        date: new Date('2021-12-19')
    },
]


function ExpensesOutput  ({expenses, expensesPeriod}) {
  return <View style={styles.container}>
    <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={ expensesPeriod}/>
   <ExpensesList expenses={DUMMY_EXPENSES} />
  </View>
}
export default ExpensesOutput

const styles = StyleSheet.create({
    container:{
        padding:24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex:1
    }
})
