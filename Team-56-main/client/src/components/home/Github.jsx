import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';


const Github = () => {

    const [data,setData]=useState([]);

    useEffect(() =>{
        fetch("https://github.com/JiyaSehgal04?tab=followers")

      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })

    },[])


  return (
    <div className="bg-purple-700 text-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Github Followers:{data.followers} </h1>
      <img src={data.avatar_url} alt="Github image" className="flex" width={300}></img>
    </div>
  )
}

export default Github
