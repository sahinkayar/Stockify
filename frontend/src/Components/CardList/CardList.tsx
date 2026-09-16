import React, { type SyntheticEvent } from "react";
import Card from "../Cards/Card";
import type { CompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";
interface props {
  searchResult: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList = ({ searchResult, onPortfolioCreate }: props) => {
  if (searchResult[0]) {
    console.log(searchResult[0].exchange);
  }

  return (
    <div>
      {searchResult.length > 0 ? (
        searchResult.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={uuidv4()}
              companies={result}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </div>
  );
};

export default CardList;
