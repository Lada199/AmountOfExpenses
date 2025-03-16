import { StyleSheet, View , Text} from "react-native"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button"

function ExpenseForm({onCancel, onSubmit, submitButtonLabel}){
    const [inputValue, setInputValues] = useState({
        amount: '',
        date: '',
        descr: ''
    })
    function inputChangeHandler(inputIdentifire ,enteredValue){
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifire]: enteredValue
            }

        })
    } 

    function submitHandler (){
        const expenseData = {
            amount: +inputValue.amount,
            date: new Date( inputValue.date),
            descr: inputValue.descr
        }
        onSubmit(expenseData)

    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your expense</Text>
        <View style={styles.inputsRow}>

        <Input label='Amount' style={styles.rowInput} textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value:inputValue.amount

        }} />
        <Input label='Date' style={styles.rowInput}  textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, 'date'),
          value:inputValue.date
        }}/>
        </View>
        <Input label='Description' textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'descr'),
            value:inputValue.descr
            
        }}/>
         <View style={styles.buttons}>
      <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
      <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
    </View>
    </View>
}
export default ExpenseForm

const styles = StyleSheet.create({
    form:{
        marginTop:80
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'

    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
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