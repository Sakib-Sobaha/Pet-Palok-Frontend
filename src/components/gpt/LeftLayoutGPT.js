import React from "react";
import { useState } from "react";

function LeftLayoutGPT()
{
    
    return(
        <div className="flex-1 bg-base-100 p-0.5 min-h-screen h-full rounded-lg flex">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png" alt="GPT" className="mt-3 w-10 h-10 inline-block mr-3"/>
            <p className="text-3xl pl-1 m-1 font-bold">Powered By GPT</p> 
        </div>
    );
}

export default LeftLayoutGPT;