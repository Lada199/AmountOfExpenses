import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-content';



const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator();


function ExpensesOverview() {
  return <BottomTabs.Navigator screenOptions={({navigation}) => ({
    headerStyle: {
      backgroundColor: GlobalStyles.colors.primary500
    },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({titntColor}) => <IconButton icon='add' size={24} color='white' onPress={() => {
      navigation.navigate('ManageExpense')
    }} />
  })}>
    <BottomTabs.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Resent',
        tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />

      }}
    />
    <BottomTabs.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />

      }} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor: GlobalStyles.colors.primary500
          },
          headerTintColor:'white'
        }}>
          <Stack.Screen
            name='ExpensesOverview'
            component={ExpensesOverview}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name='ManageExpense' component={ManageExpenses} options={{
            presentation: 'modal'
          }} />
        </Stack.Navigator>

      </NavigationContainer>
      </ExpensesContextProvider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
