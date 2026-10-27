import { useState } from "react"
export default function Auth(){
    const [mode, setmode] = useState("signup")
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
     <h2 >{mode === "signup" ? "SignUp" : "Login"}</h2>
      <form style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          className="task-card"
          style={{
            width: "70%",
            marginBottom: "0.5rem",
            padding: "0.65rem",
            borderRadius:"8px"
          }}
        />

        <input
          placeholder="Password"
          type="password"
          style={{
            width: "70%",
            marginBottom: "0.5rem",
            padding: "0.7rem",
             borderRadius:"14px"
          }}
           className="task-card"
        />
        <div>
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem" }}
          className="task-card"
        >
          {mode==="signup" ? "SignUp":"Login"}
        </button>
        <div style={{padding:"0",margin:"0"}}>
                    {mode==="signup"?(<p>
                    Already Have an Account? <span style={{color:"#007bff"}} onClick={()=>setmode('login')}>Login</span>
                    </p>):(
                        <p>Dont't Have an Account? <span style={{color:"#007bff"}} onClick={()=>setmode('signup')}>SignUp</span></p>
                    )}
                    </div>
        </div>
      </form>
      </div>
    </>
}

