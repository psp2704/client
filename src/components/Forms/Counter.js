import { useReducer } from "react";

//craete the reducer 
const reducer = (state, action) =>{
  switch(action.type){
    case "INCREMENT":{
      return { count : state.count + 1,
      isLogin: true}
    };
    case "DECREMENT": {
      return  {count: state.count - 1,
        isLogin: false};
    };
    case "RESET" : {
      return  {count :0};
    };
    default : {
      return state
    }
  }
}

//ININTIAL STATE
const INITIAL_STATE = {
  count : 0,
  isLogin : false
}

//crate the function
const Counter  = ( )=>{
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  //create a handler for each button  
  return (

    <div>
      <h2>{state.count}</h2>
      <h2>{state.isLogin}</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg m-2" onClick={()=>dispatch({type:"DECREMENT"})}>-</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg m-2" onClick={()=>dispatch({type:"INCREMENT"})}>+</button> 
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg m-2" onClick={()=>dispatch({type:"RESET"})}>Reset</button>
    </div>
  )
}

export default  Counter;