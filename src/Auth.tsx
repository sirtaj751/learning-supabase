import { useState, type ChangeEvent } from "react";
import { supabase } from "./supabase-client";

export default function Auth(){
    const [SignUp, setSignUp] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
    const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (SignUp) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign up failed:", error.message);
      return;
    }
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Login failed:", error.message);
      return;
    }
  }
};
    return <>
    <h2>Welcome To Task Manager</h2>
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0.2rem",
        borderRadius:"15px",
        border:"1.5px solid black"
      }}
    >
    <h2 >{SignUp ? "SignUp" : "Login"}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="Email"
          placeholder="Email"
          className="task-card"
          value={email}
          onChange={(e:ChangeEvent<HTMLInputElement>)=>setemail(e.target.value)}
          style={{
            width: "70%",
            marginBottom: "0.5rem",
            padding: "0.65rem",
            borderRadius:"8px"
          }}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e:ChangeEvent<HTMLInputElement>)=>setpassword(e.target.value)}
          style={{
            width: "70%",
            marginBottom: "0.5rem",
            padding: "0.7rem",
             borderRadius:"14px"
          }}
           className="task-card"
           required
        />
        <div>
        <button
          type="submit"
          
          style={{ padding: "0.5rem 1rem",backgroundColor:"#007bff",color:"white" }}
          className="task-card"
        >
          {SignUp ? "SignUp":"Login"}
        </button>
        <div style={{padding:"0",margin:"0"}}>
                    {SignUp?(<p>
                    Already Have an Account? <span style={{color:"#007bff"}} onClick={()=>setSignUp(false)}>Login</span>
                    </p>):(
                      <p>Dont't Have an Account? <span style={{color:"#007bff"}} onClick={()=>setSignUp(true)}>SignUp</span></p>
                    )}
                    </div>
        </div>
      </form>
      </div>
    </>
}
