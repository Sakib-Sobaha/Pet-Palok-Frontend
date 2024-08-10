import React, { useState } from "react";
import LeftLayoutPets from "../../components/LeftLayoutPets";
import MiddleLayoutPets from "../../components/MiddleLayoutPets";
import RightLayout from "../../components/RightLayout";
import LayoutLRM from "../../components/LayoutLRM";

function Pets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ min: 1, max: 20, types: [] });
  const [sortOrder, setSortOrder] = useState("");

  return (
    <div>
      <LayoutLRM
        left={
          <LeftLayoutPets
            onSearch={setSearchTerm}
            onFilter={setFilter}
            onSort={setSortOrder}
          />
        }
        middle={
          <MiddleLayoutPets
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

export default Pets;
