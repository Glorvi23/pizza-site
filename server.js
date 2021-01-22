const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const pizzas = [
  {
    id: 1,
    name: "Pepperoni",
    price: "$8.99",
    description: "Covered in delicious hand-made pepperoni!",
  },
  {
    id: 2,
    name: "Cheese",
    price: "$6.99",
    description: "Plain and simple. Just like you!",
  },
  {
    id: 3,
    name: "Hawaiian",
    price: "$10.99",
    description: "Really? Who eats that stuff?!?",
  },
];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/pizzas/:id", (req, res) => {
    const pizzaId = parseInt(req.params.id);
    for(let i = 0; i < pizzas.length; i++){
        if(pizzas[i].id === pizzaId){
            return res.render("single-pizza", pizzas[i])
        }
    }
    res.render("not-found");
});

app.get("/pizzas", (req, res) => {
  res.render("all-pizzas", { pizzas: pizzas });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
