import React from "react"

function TestInput({Title,state,setState}){
    return (
        <>
        <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        {Title}
      </span>
      <input type="number" value={state} placeholder={Title}
        onChange={(e) => setState(e.target.value)} />
        </>
    ) 
}

export default TestInput;