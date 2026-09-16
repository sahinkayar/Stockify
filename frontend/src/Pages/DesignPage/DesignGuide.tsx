import React from "react";
import Table from "../../Components/Table/Table";

import RatioList from "../../Components/RatioList/RatioList";
import { testIncomeStatementData } from "../../Components/Table/testData";
const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
];
function DesignGuide() {
  return (
    <div>
      <h1>finShark design Page</h1>
      <h2>This is FinShark's design Page</h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table data={testIncomeStatementData} config={tableConfig} />
    </div>
  );
}

export default DesignGuide;
