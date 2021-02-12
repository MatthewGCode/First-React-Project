import React, {Component} from "react";
import ShoppingList from "./components/ShoppingList.jsx";
import ToDoList from "./components/ToDoList.jsx";

class App extends Component {
    render() { 
        return (  
            <React.Fragment>
                <ShoppingList />
                <ToDoList /> 
            </React.Fragment>
        );
    }
}
 
export default App;