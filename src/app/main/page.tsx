"use client"
import React, { useState } from 'react'
import { Models, Languages } from '@/app/main/constants'
import VoiceAssistant  from '@/components/VoiceAssistant'
import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Main = () => {

  const [selectedModel, setSelectedModel] = useState(Models[0].name);
  const [selectedLang, setSelectedLang] = useState(Languages[0].name);
  const [isClicked, setIsClicked] = useState(false);
  const [text, setText] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState(true);
  const [isKnowledgeBaseList, setKnowledgeBaseList] = useState(true);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const room = "test-room"

  const handleTestClick = async () => {
    // await getToken;
    setShowVoiceAssistant(true);
  };
  const url = "https://livekitwebapp-abddetfvdfg2gaar.eastus2-01.azurewebsites.net"

  // const url = "livekitwebapp-abddetfvdfg2gaar.eastus2-01.azurewebsites.net"
  const sendData = async () => {
    try {
      const response = await axios.post(`${url}/sendData`, { text }); 
      // Assuming the server sends a response
      console.log(text);
      alert("Update Successful");
    } catch (error) {
      alert("Something went wrong")
      console.error("Error sending data:", error);
      
    }
  };

  const onClickHandker = ()=> {
    sendData();
    
  }
  
  return (
    <div className='flex bg-gray-100 h-[100vh] w-full'>
      <div className='w-[45vw] bg-white m-2 rounded-sm '> 
        <select 
          className='p-1 m-2 rounded-full w-24 text-sm bg-gray-100 border border-gray-300 '
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {Models.map((model: any) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
        <select 
          className='p-1 m-2 rounded-full w-24 text-sm bg-gray-100 border border-gray-300 '
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {Languages.map((lang: any) => (
            <option key={lang.id} value={lang.name}> {lang.name} </option>
          ))}
        </select>

        <textarea 
          className='p-2 m-3 rounded-md w-[95%] text-sm border border-gray-300 h-[50vh]'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <button className={`
        m-2 mx-4 p-2 border-1 cursor-pointer bg-gray-100 rounded-sm`}onClick={onClickHandker}>Submit</button>  */}
        <button className={`
        m-2 mx-4 p-2 border-1 bg-gray-100 rounded-sm ${ showVoiceAssistant ? " cursor-not-allowed opacity-50" : " cursor-pointer " }`}onClick={onClickHandker} disabled={showVoiceAssistant}
        >Submit</button> 
        {/* <button className='p-2 m-2 rounded-md w-[95%] text-sm cursor-pointer bg-blue-500 text-white ' onClick={handleSubmit}>Submit</button>
        <button className='p-2 m-2 rounded-md w-[95%] text-sm cursor-pointer bg-blue-500 text-white ' onClick={handleActivateAgent}>Activate Agent</button> */}

        {/* <button 
        className='p-2 m-2 rounded-md w-[95%] text-sm cursor-pointer bg-blue-500 text-white ' 
        onClick={handleAll}
        >Handle All</button> */}
        
      </div>
      <div className='w-[27vw] bg-white m-2 rounded-sm '> 
        <div className='cursor-pointer' onClick={() => setKnowledgeBase(!knowledgeBase)}> 
          <h1 className='m-3 text-sm text-black hover:underline'>Knowledge Base</h1> 
        </div>
        {
          knowledgeBase && (
            <div className='text-gray-500 m-2 mx-3 '>
              <p className=' p-1  text-xs'> Add knowledge base to provide context to the agent.</p>
              <div className='cursor-pointer inline-block text-black  border border-gray-300 p-2 rounded-sm px-3 text-sm'> 
                <div className='relative'>
                  <div>Add </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div className='w-[27vw] text-sm bg-white m-2 rounded-sm '> 
        <div className='flex justify-center'>
          <div className='flex bg-gray-100 p-1 rounded-sm w-[40%] h-fit m-2 justify-between'>
            <div className={` p-1 cursor-pointer rounded-sm  mx-1 w-[100%] bg-white`}>  
              Test Audio
            </div>
          </div>
        </div>
        <hr className='w-[80%] border-gray-700 mx-auto '/>

        {showVoiceAssistant  ?  ( 
            <VoiceAssistant  setShowVoiceAssistant={setShowVoiceAssistant}  />) : 
            (<div className='flex flex-col justify-center items-center h-[90%]'>
            <h1 className='text-xl text-black '> Test your agent</h1>
            <br/>
            <button 
              className='cursor-pointer text-black border border-gray-300 p-2 rounded-md px-4'
              onClick={handleTestClick}
            > 
              Test
            </button>
  
  
          </div>

      )}



      </div>


    </div>
  )
}

export default Main;