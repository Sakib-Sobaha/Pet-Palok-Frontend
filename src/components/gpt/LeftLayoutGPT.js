import React from "react";
import { useState } from "react";

function LeftLayoutGPT()
{
    
    return(
        <div className="flex-1 bg-base-100 p-0.5 min-h-screen h-full rounded-lg">
            <img src="https://raw.githubusercontent.com/RMNCLDYO/groq-ai-toolkit/main/.github/groq-logo.png" 
                className=" h-16 m-1" alt="GROC Logo"
            />
            <p className="text-3xl pl-1 m-1 font-bold">Powered By GROQ</p> 
        </div>
    );
}

export default LeftLayoutGPT;