import { createContext, useReducer } from "react";

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
        date: new Date()
    },
]

export const ExpensesContext = createContext({
    expenses:[],
    addExpense:({descr, amount, date}) => {},
    deleteExpense:(id) => {},
    updateExpense:(id, {descr, amount, date}) => {},
});

 
function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const updatebleExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatebleExpense,  ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem 
            return  updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
            default:
                return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData})
    }
    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id})
    }
    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value ={
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense:updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider