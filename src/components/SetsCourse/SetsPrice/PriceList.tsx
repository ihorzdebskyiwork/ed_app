import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { buyExamsThunk } from "../../../redux/offers/operations";
import { selectIsLoadingBuy } from "../../../redux/offers/selectors";
import { Button } from "../../Button";

interface IProps {
  priceList: any;
  activeTitle: number;
}

export const PriceList: React.FC<IProps> = ({ priceList }) => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const isLoadingBuy = useSelector(selectIsLoadingBuy);

  const priceBtnClick = (stripe_id: string) => {
    dispatch(buyExamsThunk(stripe_id));
  };

  return (
    <>
      {priceList.length > 0 ? (
        <div className="mx-auto p-5 pb-8 w-840px h-168px shadow-md rounded-xl">
          <ul>
            {priceList?.map((item: any) => (
              <li key={item.id}>
                <h2 className="font-bold mb-16px">{item.tittle}</h2>
                <div className="flex justify-between">
                  <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  <Button
                    text={isLoadingBuy ? "Loading..." : "Buy"}
                    isDisabled={isLoadingBuy}
                    handleClick={() => {
                      priceBtnClick(item.stripe_id);
                    }}
                    extraStyles="hover:bg-blue-500 bg-blue-400 justify-center items-center border-2 h-10 w-32  text-white rounded-xl font-semibold duration-300"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};
