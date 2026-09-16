import React from "react";

interface Props {
  title: string;
  subTitle: string;
}
function Tile({ title, subTitle }: Props) {
  return (
    <div className="w-full mb-3 ">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg  mb-5">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4  ">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {title}
              </h5>

              <span className="font-bold text-xl">{subTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
