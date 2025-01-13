import React from "react";
import { useState } from "react";
import LayoutLRM from "../../components/LayoutLRM.js";
import LeftLayout from "../../components/petDetection/LeftLayoutPetDetection.js"
import RightLayout from "../../components/petDetection/RighlayoutPetDetection.js";
import MiddleLayout from "../../components/petDetection/MiddleLayoutPetDetection.js"

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