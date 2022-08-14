import "./App.css";
import  Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { TodoItem } from "./MyComponents/TodoItem";



function App() {
  let initTodo;
 
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const [todos, setTodos] = useState(initTodo);
  const onDelete = (todo) => {
    console.log("I am ON delete", todo);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };
  
 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
    <Router>
      
      <Routes>
          <Route exact path="/" element={ <>
            <Header />
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
            </>}  
            > 
          </Route>
          <Route exact path="/about" element={<About />} >
          </Route> 
        </Routes> 
      <Footer />
    </Router>
    </>
  );
}

export default App;
