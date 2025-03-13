import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-content";
import ExpenseForm from "../components/ManageExpense/Expenseform";


function ManageExpenses  ({route, navigation}) {

  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title:  isEditing ? 'Edit Expense' : 'Add Expense'
    })

  }, [navigation, isEditing])

  function deleteExpenseHandler(){
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();

  }
  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler(){
    if(isEditing){
      expensesCtx.updateExpense(
        editedExpenseId,
        {descr: 'Test!!', amount: 29.99, date: new Date()}
      );
    }else{
      expensesCtx.addExpense({descr: 'Test', amount: 19.99, date: new Date()})
    }
    navigation.goBack()

  }


  return <View style={styles.container}>
    <ExpenseForm/>
    <View style={styles.buttons}>
      <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
      <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add' }</Button>
    </View>
    {isEditing && 
    (
      <View style={styles.deleteContainer}>
      <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
      </View> 
)}
  </View>
  
}

export default ManageExpenses

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderTopWidth:2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems:'center'

  },
  button: {
    minWidth: 120,
    marginHorizontal:8

  },
  buttons:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
})