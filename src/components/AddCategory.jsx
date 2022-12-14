import { useEffect, useState } from "react";
import { Alerts } from "./Alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const AddCategory = ({ onAddCategory }) => {
  const [inputValue, setInputValue] = useState(""); // useState retorna un arreglo con dos elementos, el primero es el valor del estado y el segundo es una funcion que nos permite actualizar el valor del estado

  const handleInputChange = (e) => {
    // funcion que se ejecuta cada vez que el usuario escribe en el input
    setInputValue(e.target.value); // actualizamos el valor del estado con el valor del input
  };

  const handleSubmit = (e) => {
    // funcion que se ejecuta cada vez que el usuario presiona enter en el input
    e.preventDefault(); // evitamos que el formulario se envie y se recargue la pagina
    if (inputValue.trim().length <= 1) {
      Alerts.fire({
        icon: "error",
        title: "Please enter a valid search term",
      });
      return;
    }
    onAddCategory(inputValue.trim()); 
    onAddCategory(inputValue.charAt(0).toUpperCase() + inputValue.slice(1)); // actualizamos el valor del estado con el valor del input
    setInputValue("");
  };

  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    window.scrollY ? setScroll(true) : setScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return (
    <form
      className={scroll ? "form-add-category active" : "form-add-category"} // si el usuario hace scroll se le agrega la clase active al form-add-category
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <FontAwesomeIcon icon={faSearch} />
      <input
        className="input-add-category" // si scroll es true se le agrega la clase active al input-add-category
        type="text"
        placeholder="Search"
        value={inputValue} // el valor del input es el valor del estado
        onChange={handleInputChange} // cada vez que el usuario escribe en el input se ejecuta la funcion handleInputChange
      />
      </div>
    </form>
  );
};
