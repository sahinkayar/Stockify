import React from "react";
import ClipLoaderModule from "react-spinners/ClipLoader";
import "./Spinner.css";
interface Props {
  isLoading?: boolean;
}
const LoaderComponent = (ClipLoaderModule as any)?.default || ClipLoaderModule;
function Spinner({ isLoading = true }: Props) {
  return (
    <div id="loading-spinner">
      <LoaderComponent
        color="#36d7b7"
        loading={isLoading}
        size={75}
        aria-label="Loading spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
