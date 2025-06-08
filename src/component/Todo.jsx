import React, { useState } from 'react'
import Todocss from "./todo.module.css";
import { toast} from "react-hot-toast"


const Todo = () => {

    const taskData = [{task:"Buy Bike", complete:false,},
        {task:"Buy Phone", complete:false},
        {task:"Buy Car", complete:true},
         
        
    ];

    const [alldata, setAllData] = React.useState(taskData);
    const [todoTask, setTodoTask] = React.useState("");
    const [search,setsearch]= React.useState("")

    const [cTask,setctask] = React.useState(0);
    const [rTask,setrtask] = React.useState(0);


    function handleForm(e){
        e.preventDefault();
        console.log({task:todoTask});
        const myTask = todoTask.trim();
        if(!myTask){
            toast.error('Please Add Task!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
}else{

    const isverified = alldata.some((value,index)=>{
        return value.task.toLowerCase()===todoTask.toLowerCase();

    });
    if(isverified){
        toast.error('Task Already Added!',
  {
    icon: '❌',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
    }else{
        setAllData([...alldata, {task:myTask, complete:false}]);
        toast.success("Task Added...😍")
    setTodoTask("");

    }
}
    }
    function handleDelete(id){
        const copyofAlldata = [...alldata];
        const filtervalue = copyofAlldata.filter((value,index) =>{
            return index !== id
        });
        if(filtervalue){ 
            const taskDelete = window.confirm(
                "Are you sure you want to delete task😊"
            );
            if(taskDelete){
                setAllData(filtervalue);

            }else(
                setAllData(copyofAlldata)   
            )
        }
        
        
        
    }
    function handleCheckbox(id){
        const copyofAlldata = [...alldata];
        copyofAlldata.complete = !copyofAlldata[id].complete;
        setAllData(copyofAlldata);

        const allcompleteTask = copyofAlldata.filter((value)=>{
            return value.complete
        });
        setctask(allcompleteTask.length)    

        const allremaningTask = copyofAlldata.filter((value)=>{
            return !value.complete

    });
    setrtask(allremaningTask.length)
}

    function handleClear(){
        setAllData([]);
    }

    function handleEdit(id){
        console.log(id)
        const copyofAlldata = [...alldata];
        const oldTask = copyofAlldata[id].task;
        const newTask = prompt('update Task :- ${oldTask}',oldTask);
        const newobj = {task:newTask,complete:false};
        copyofAlldata.splice(id,1,newobj);
        setAllData(copyofAlldata);

    }

    const filterTask = alldata.filter((items)=>{
        return items.task.toLocaleLowerCase().includes(search.toLowerCase());
    })
    console.log(filterTask);

  return (
    <div >
        <div className={Todocss.main}>
            <h1>Todo-App</h1>
            <div className={Todocss.task}>
                



                <form action="" onSubmit={handleForm}>
                <input type="text" name='' id='' placeholder='Add Task Here' className='form-control' value={todoTask} onChange={(e)=>{setTodoTask(e.target.value);}}/>
                {/*search Bar */}
                <input type="search" name="" id="" className="form-control mt-3" placeholder='Search Task Here...✨' value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                <button type='Summit'className='form-control btn btn-success mt-3'> Add</button>
            </form>
            {
                filterTask.length===0 ? <h3 className='text-center '>No Matching Result...🔍</h3> : filterTask.map((items, index)=>(
                    
                <div key={index} className={Todocss.alltask}>

                    <input type="checkbox" name="" id="" className={Todocss.checkbox} checked={items.complete} onClick={()=>{handleCheckbox(index);}}/>
                    <span style={{textDecoration: items.complete ? "line-through red": ""}}>{items.task}</span>
                    <i class="bi bi-x-circle text-danger float-end mx-2" onClick={()=>{handleDelete(index);

                }}></i>
                    <i class="bi bi-pencil-square text-success float-end mx-2" onClick={()=>{handleEdit(index);}}></i>
                   
                </div>
            
                ))
            }
            <button className='btn btn-outline-danger form-control mt-4' onClick={handleClear}>All Clear! 🫧</button>

            </div>  

            <span className='fw-bold'>complete Task :- {cTask} </span>
            <span className='fw-bold'>Remaning Task :- {rTask} </span>
        </div>
        
        
    </div>
  )
}

export default Todo;