import { useState } from "react";
import { addClassApi, viewClasses } from "../services/class.api";

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

  const addClass = async ({className , section , room , medium}) => {
    setLoading(true);
    try {
      const response = await addClassApi({className , section , room , medium});
      if (!response || !response.class) {
      throw new Error("Invalid response structure from server");
    }
      const classData = response.class;

      return classData;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    addClass,
    getClasses,
    loading,
    classes,
  };
};
