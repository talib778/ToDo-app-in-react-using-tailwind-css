import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
const TodoBox = () => {
  const [isButton, setButton] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);
  const handleComplete=(index)=>{
  let now=new Date();
  let dd=now.getDate();
  let mm=now.getMonth() + 1;
  let yyyy=now.getFullYear();
  let h=now.getHours();
  let m=now.getMinutes();
  let s=now.getSeconds();
  let completeOn=dd+'-'+mm+'-'+yyyy+'at'+h+':'+m+':'+s;
  let filteredItem={
    ...allTodos[index],
    completeOn:completeOn
  }  
  let updatedCompletedArr=[...completeTodos];
  updatedCompletedArr.push(filteredItem);
  setCompleteTodos(updatedCompletedArr);
  handleDelete(index);
  localStorage.setItem('completeTodos',JSON.stringify(updatedCompletedArr));

  }
  const handleAdd = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Please enter both a title and a description.");
      return;
    }
    let new_todo_list = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodo = [...allTodos];
    updatedTodo.push(new_todo_list);
    setTodos(updatedTodo);
    localStorage.setItem('TodoList',JSON.stringify(updatedTodo))
    setTitle("");
    setDescription("");
  };
  const handleDelete=(index)=>{
  let deleteTodo=[...allTodos];
  deleteTodo.splice(index,1);
  localStorage.setItem('TodoList',JSON.stringify(deleteTodo));
  setTodos(deleteTodo);
  };
  const handleDeleteCompleted=(index)=>{
    let deleteTodo=[...completeTodos];
    deleteTodo.splice(index,1);
    localStorage.setItem('completeTodos',JSON.stringify(deleteTodo));
    setCompleteTodos(deleteTodo);
  };
  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('TodoList'))
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completeTodos'))
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompleteTodos(savedCompletedTodo); 
    }
  },[])
  return (
    <div className="py-[150px] px-[230px]">
      <div className="box bg-[#3f4152] p-16">
        <div className="task flex items-center justify-center">
          <div className="flex flex-col -ml-[70px]">
            <label htmlFor="task1" className="text-white text-2xl">
              Title
            </label>
            <input
              type="text"
              id="task1"
              placeholder="Enter Your Task"
              className="py-[5px] px-[14px] focus:outline-none focus:outline-green-700"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col ml-16">
            <label htmlFor="about" className="text-white text-2xl">
              About
            </label>
            <input
              type="text"
              id="about"
              placeholder="Enter about Your Task"
              className="py-[5px] px-[14px] focus:outline-none focus:outline-green-700"
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="px-[15px] py-[5px] mt-7 ml-5 text-white bg-green-600 hover:bg-green-900 rounded-md"
              onClick={handleAdd}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="mt-[20px] ml-[70px]">
          <button
            className={`px-[8px] py-1.5 rounded-sm text-white ${
              !isButton ? "bg-green-700" : "bg-slate-800"
            }`}
            onClick={() => setButton(false)}
          >
            TO DO
          </button>
          <button
            className={`px-[8px] py-1.5 rounded-sm text-white ${
              isButton ? "bg-green-700" : "bg-slate-800"
            }`}
            onClick={() => setButton(true)}
          >
            Completed
          </button>
        </div>
        {isButton===false && allTodos.map((item, index) => {
          return (
            <div
              className="flex items-center justify-between mt-4 ml-14 bg-slate-900 shadow-[10px_20px_30px_rgb(30,20,30)]"
              key={index}
            >
              <div className="flex flex-col px-[30px] py-[15px] ">
                <h3 className="text-white text-4xl text-green-600">
                  {item.title}
                </h3>
                <p className="text-white text-1xl">{item.description}</p>
              </div>
              <div className="text-white text-[30px] text-green-600 mr-7 ">
                <FontAwesomeIcon icon={faTrash} className="mr-[10px] hover:text-red-500" onClick={()=>handleDelete(index)} />
                <FontAwesomeIcon icon={faCheck} onClick={()=>handleComplete(index)} />
              </div>
            </div>
          );
        })}
        {isButton===true && completeTodos.map((item, index) => {
          return (
            <div
              className="flex items-center justify-between mt-4 ml-14 bg-slate-900 shadow-[10px_20px_30px_rgb(30,20,30)]"
              key={index}
            >
              <div className="flex flex-col px-[30px] py-[15px] ">
                <h3 className="text-white text-4xl text-green-600">
                  {item.title}
                </h3>
                <p className="text-white text-1xl">{item.description}</p>
                <small>Completed on: {item.completeOn}</small>
              </div>
              <div className="text-white text-[30px] text-green-600 mr-7 ">
                <FontAwesomeIcon icon={faTrash} className="mr-[10px] hover:text-red-500" onClick={()=>handleDeleteCompleted(index)} />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default TodoBox;
