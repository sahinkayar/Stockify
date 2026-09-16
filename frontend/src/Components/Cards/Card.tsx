import React, { type SyntheticEvent } from "react";
import "./Card.css";
import type { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from "react-router-dom";
interface CardProps {
  id: string;
  companies: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}
const Card = ({ companies, id, onPortfolioCreate }: CardProps) => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
        key={id}
        id={id}
      >
        <Link
          to={`/company/${companies.symbol}/company-profile`}
          className="font-bold text-center text-black md:text-left"
          state={{ searchData: companies }}
        >
          {companies.name} ({companies.symbol})
        </Link>
        <p className="text-black">{companies.currency}</p>
        <p className="font-bold text-black">
          {companies.exchangeShortName} - {companies.stockExchange}
        </p>
        <AddPortfolio
          onPortfolioCreate={onPortfolioCreate}
          symbol={companies.symbol}
        />
      </div>
    </>
  );
};

export default Card;
