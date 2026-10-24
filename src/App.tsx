import "./App.css";
import { useState,useEffect } from "react";
import { supabase } from "./supabase-client";
interface Task{
  id:number,
  title:string,
  description:string,
  created_at:string
}

function App() {
  const [newTask, setnewTask] = useState({title:"",description:""});
  const [readTask, setreadTask] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState({ title: "", description: "" });
  console.log(editingId, editTask);
  const handlesumit= async (e:any) => {
   e.preventDefault() 
   const{error}=await supabase.from("tasks").insert(newTask)
   if (error) {
    console.log("Error in sumitting data",error.message)
    return;
   }
   setnewTask({title:"",description:""});
   fetchTasks();
  }
  const fetchTasks= async ()=>{
    const {error , data} = await supabase.from("tasks").select("*").order("created_at",{ascending:true})
    if (error) {
    console.log("Error in reading data",error.message)
    return;
   }
   setreadTask(data)
  }
 useEffect(()=>{
  fetchTasks()
 },[])
 const deleteTask = async (id:number)=>{
    const{error}=await supabase.from("tasks").delete().eq("id",id)
    if(error){
      console.log("error in deletion",error.message)
    }
    setreadTask((prev) => prev.filter((item) => item.id !== id));
 }
 const saveTask = async (id: number) => {
  const { error } = await supabase
    .from("tasks")
    .update(editTask)
    .eq("id", id);

  if (error) {
    console.log("Error in updating", error.message);
    return;
  }

  setEditingId(null);
  fetchTasks();
};
  
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <h2>Task Manager CRUD</h2>

      <form onSubmit={handlesumit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setnewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          className="task-card"
          style={{
            width: "100%",
            marginBottom: "0.5rem",
            padding: "0.65rem",
            borderRadius:"8px"
          }}
        />

        <textarea
          placeholder="Task Description"
           value={newTask.description}
          style={{
            width: "100%",
            marginBottom: "0.5rem",
            padding: "0.7rem",
             borderRadius:"14px"
          }}
           className="task-card"
           onChange={(e) =>
            setnewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <button
          type="submit"
          style={{ padding: "0.5rem 1rem" }}
          className="task-card"
        >
          Add Task
        </button>
      </form>

      <h2>List of Tasks</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {readTask.map((task) => (
          <li
            key={task.id}
            className="task-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "14px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            {editingId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask((prev) => ({ ...prev, title: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    padding: "0.5rem",
                  }}
                />
                <textarea
                  value={editTask.description}
                  onChange={(e) =>
                    setEditTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    padding: "0.5rem",
                  }}
                />
                <button
                  onClick={() => setEditingId(null)}
                  style={{ padding: "0.5rem 1rem" }}
                  
                >
                  Cancel
                </button>
                <button onClick={()=>saveTask(editingId)} >Save</button>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div>
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditTask({
                        title: task.title,
                        description: task.description,
                      });
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      marginRight: "0.5rem",
                    }}
                    className="task-card"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{ padding: "0.5rem 1rem" }}
                    className="task-card"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;