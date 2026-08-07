import React, { useEffect, useState } from "react";
import { useClasses } from "../../hooks/useClasses";
import "../../styles/dashboard.css";
import ClassList from "./ClassList";
import AddClassForm from "./AddClassForm";
const Classes = () => {
  const [currPage, setCurrPage] = useState("classTablePage");

  return <div>{currPage == "classTablePage" && <ClassList currPage = {currPage} setCurrPage = {setCurrPage} />}
  {currPage == 'addClassFormPage' && <AddClassForm currPage = {currPage} setCurrPage = {setCurrPage} />}</div>;
};

export default Classes;
