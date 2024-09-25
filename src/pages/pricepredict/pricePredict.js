import React from "react";
import { useState } from "react";
import LayoutLRM from "../../components/LayoutLRM.js";
import LeftLayout from "../../components/gpt/LeftLayoutGPT.js"
import RightLayout from "../../components/gpt/RightLayoutGPT";
import MiddleLayout from "../../components/gpt/MiddleLayoutPricePredictor.js"

const GPT = () => 
{
  
      return(
        <LayoutLRM
        left={<LeftLayout/>}
        middle={<MiddleLayout />}
        right={<RightLayout />}
      />
    );
}

export default GPT;