import { StyleSheet, View, Text, Alert } from "react-native"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import { GlobalStyles } from "../../constants/styles"

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true  },
        date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true  },
        descr: { value: defaultValues ? defaultValues.descr : '', isValid: true  }
    })
    function inputChangeHandler(inputIdentifire, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifire]: {value: enteredValue, isValid: true}
            }

        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            descr: inputs.descr.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descrIsValid = expenseData.descr.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descrIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values')
            setInputs((curInput) =>{
                return{
                    amount: {value: curInput.amount.value, isValid: amountIsValid},
                    date: {value: curInput.date.value, isValid: dateIsValid},
                    descr: {value: curInput.descr.value, isValid: descrIsValid}
                }
            })
            return
        }





        onSubmit(expenseData)

    }
    const formISInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.descr.isValid

    return <View style={styles.form}>
        <Text style={styles.title}>Your expense</Text>
        <View style={styles.inputsRow}>

            <Input label='Amount' style={styles.rowInput} invalid={!inputs.amount.isValid} textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value

            }} />
            <Input label='Date' style={styles.rowInput} invalid={!inputs.date.isValid} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }} />
        </View>
        <Input invalid={!inputs.descr.isValid} label='Description' textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'descr'),
            value: inputs.descr.value

        }} />
        {formISInvalid &&   <Text style={styles.errorText} >Invalid input value - please check your entered data!</Text>}
       
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}
export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'

    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText:{
        textAlign:'center',
        color: GlobalStyles.colors.error500,
        margin:8
    }
})