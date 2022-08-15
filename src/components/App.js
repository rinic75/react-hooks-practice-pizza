import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState([])

  useEffect(()=> {
    fetch("http://localhost:3001/pizzas")
    .then(r=>r.json())
    .then(data => setPizzas(data))
  },[])

  function handleChangedPizza(name, value) {
    setSelectedPizza({...selectedPizza, [name]: value})
  }
  function handleEditPizza(newPizza) {
    const editedPizza = pizzas.map(pizza => {
      if(pizza.id === newPizza.id) {
        return newPizza
      } else {
        return pizza
      }
    })
    setPizzas(editedPizza)
  }

  return (
    <>
      <Header />
      <PizzaForm pizza={selectedPizza} onChangedPizza={handleChangedPizza} onEditPizza={handleEditPizza}/>
      <PizzaList pizzas={pizzas} onSelectPizza={setSelectedPizza}/>
    </>
  );
}

export default App;
