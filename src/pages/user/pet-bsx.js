import React, { useState } from "react";
import LeftLayout from "../../components/LeftLayoutPetBSX.js";
import MiddleLayoutPetBSX from "../../components/MiddleLayoutPetBSX.js";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function PetBSX() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ min: 1, max: 20, types: [] });
  const [sortOrder, setSortOrder] = useState("");

  return (
    <div>
      <LayoutLRM
        left={
          <LeftLayout
            onSearch={setSearchTerm}
            onFilter={setFilter}
            onSort={setSortOrder}
          />
        }
        middle={
          <MiddleLayoutPetBSX
            searchTerm={searchTerm}
            filter={filter}
            sortOrder={sortOrder}
          />
        }
        right={<RightLayout />}
      />
    </div>
  );
}

export default PetBSX;
