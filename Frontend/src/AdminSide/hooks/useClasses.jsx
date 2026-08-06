import { useState } from "react";
import { addClass, viewClasses } from "../services/class.api";


export const useClasses = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);



  const getClasses = async () => {
    setLoading(true);

    try {
      const response = await viewClasses();
      const classes = response.classes;
      
      
      setClasses(classes);

      return classes;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getClasses , loading , classes
  };
};
