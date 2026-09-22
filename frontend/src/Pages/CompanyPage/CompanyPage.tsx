import React, { useEffect, useState } from "react";
import { data, useLocation, useParams } from "react-router-dom";
import type { CompanyProfile, CompanySearch } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
function CompanyPage() {
  const location = useLocation();
  const { ticker } = useParams<{ ticker: string }>();
  const [company, setCompany] = useState<CompanyProfile>();
  const searchData = location.state?.searchData as CompanySearch | undefined;

  useEffect(() => {
    const getProfileInit = async () => {
      try {
        const result = await getCompanyProfile(ticker!, searchData);

        if (result && result.length > 0) {
          setCompany(result[0]);
        } else {
          console.warn("Couldn't find Company data.");
        }
      } catch (error: any) {
        console.error("Api profile errror:", error.message);
      }
    };

    getProfileInit();
  }, [ticker]);
  if (!ticker) return <div>Invalid Ticker</div>;
  return (
    <div>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker}>
            <div className="flex-auto flex gap-2">
              <Tile
                title="Company Name"
                subTitle={company.companyName || "N/A"}
              />
              <Tile title="currency" subTitle={company.currency || "N/A"} />
              <Tile title="symbol" subTitle={company.symbol || "N/A"} />
              <Tile
                title="exchange Full Name"
                subTitle={company.exchangeFullName || "N/A"}
              />{" "}
            </div>

            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-0 ">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default CompanyPage;
