import { useState } from "react";
import { AddCategory, Alerts, GifGrid, Header } from "./components";

export const GifApp = () => {
  const [categories, setCategories] = useState(["Pc Gaming"]); // creamos el estado categories y su funcion setCategories

  const handleAddCategory = (newCategory) => {
    if (categories.includes(newCategory.charAt(0).toUpperCase() + newCategory.slice(1))) { // si la categoria ya existe
      Alerts.fire({
        icon: "error",
        title: "This category already exists",
      });
      return;
    }
    setCategories([newCategory, ...categories]); // agregamos el nuevo elemento al principio del arreglo
  };

  return (
    <> 
      <Header /> {/* componente Header */}
      <AddCategory onAddCategory={handleAddCategory} /> {/* componente AddCategory */}
      <main> {/* componente GifGrid */}
        {categories.map((categories) => { // recorremos el arreglo de categorias y por cada categoria retornamos un componente GifGrid
          return <GifGrid key={categories} categories={categories} />; // pasamos la categoria al componente GifGrid
        })} 
      </main> 
    </> 
  );
};
