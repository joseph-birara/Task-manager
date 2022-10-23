import React, { useState,useEffect} from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import { FaSortAmountDown } from 'react-icons/fa'
import SearchIcon from '../../Assets/IconCollection/SearchIcon'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import {MdOutlineAccountCircle} from 'react-icons/md'
import Task from './Task'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTasks } from './TaskSlice'
import { GetAllTasks } from './TaskActions'
import axios from 'axios'
import tasks from './tasks'
import HomePageImage from '../../Assets/IconCollection/HomePageImage'
import AddTaskPlus from '../../Assets/IconCollection/AddTaskPlus'
import Sorting from '../../Assets/IconCollection/Sorting'
import Filter from '../../Assets/IconCollection/Filter'
import { selectCurrentUsers } from '../user/userSlice'


function HomePage() {
    const dispatch = useDispatch()
    // const [tasksData, settasksData] = useState('')
    const { allTasks } = useSelector(selectCurrentTasks)
    const { userToken } = useSelector(selectCurrentUsers)
    const [search, setsearch] = useState('')
    let filterdTasks = ''
    
  
    useEffect(() => {
        console.log("form homepage",userToken.Token,allTasks)

       
        dispatch(GetAllTasks({userToken:userToken.Token}))
      
            
    }, [userToken])

    if (allTasks) {
        filterdTasks =  allTasks.filter(monster => monster.title.toLowerCase().includes(search.toLowerCase()));
         
     }
          

    
    
    return (
      <div className='lg:mt-1 sm:ml-3 lg:ml-10 lg:mr-12 overflow-hidden'>
      <div className='flex flex-auto justify-between items-center mr-10 sm:mr-5 lg:ml-20 lg:mr-24'>
                <div className='md:ml-10'>
                   {/* { <form>
                        <input
                 
                  required
                  value={search}
                   type='text'
                  name="email"
                  id="email"
                  placeholder="search here "
                  className="inputBox"
                  
        />
                    </form>} */}
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          <div className='flex  -mr-3 gap-3 m-10 lg:ml-24 sm:items-center lg:w-80 mt-8 '>
             
                    <div
                        className=' iconbg'>
                        
                <Filter/>
                    </div>
                    <div
                        className=' iconbg'>
                <Sorting/>
              </div>
                    <div
                        className=' iconbg'>
                <SearchIcon/>
              </div>
              <div className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
                 <AccountIcon/>
              </div>
              
              
          </div>
          
            </div>
            <div className='text-center text-2xl font-black -mt-12 sm:-ml-8 md:-ml-14'>
                Your TooDoo
            </div>
            <div className='flex justify-center text-center content-center mt-4'>
                <div className='flex flex-col m-12 mt-3 items-center gap-2 '>
                    
                    
                    
                    {
                       allTasks.length>0?
                         filterdTasks.map((data ,i)=> 
                        <Task  task={ data } key = {i} />
                 
                    )
                            : <div>
                                <HomePageImage />
                    <div className='text-center w-52 font-thin text-lg -ml-3'>
               Get started by creating your very first task.
          </div> 
                        
                </div>
                    
                
                    }

            </div>

            </div>
            
            
            <div
                onClick={()=>dispatch(GetAllTasks())}
                className='addTask'>
                <AddTaskPlus/>
            </div>
            </div>
  )
}

export default HomePage