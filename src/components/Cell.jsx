import React from "react";
import { useState } from "react";
import './Cell.css'

const Cell = ({
  item,
  k,
  data,
  setData,
  obstacles,
  source,
  destination,
  src,
  setSrc,
  dest,
  setDest, 
  dragging,
}) => {
  const value = item.isClicked ? (item.isObstacle&&"bg-black"||item.isSource&&"bg-red-400"||item.isDestination&&"bg-green-400") : (item.visited?(item.inPath?"bg-blue-600 anim":"bg-yellow-300 anim"):"");
  
  return (
    <button
      className={"w-9 h-9 border border-black " + value}
      onMouseEnter={
        dragging&&obstacles&& 
        (() => {
            let arr = [...data];
            if (!(arr[k].isClicked && !arr[k].isObstacle)) {
              arr[k].isClicked = true;
              arr[k].isObstacle = true;
              setData(arr);
            }
        })||undefined
      }
      onClick={source&&(()=>{
        let arr = [...data]
        if (!(arr[k].isClicked && !arr[k].isSource)) {
          if(src!=-1){
            arr[src].isClicked = !arr[src].isClicked;
            arr[src].isSource = !arr[src].isSource;
          }
          arr[k].isClicked = !arr[k].isClicked;
          arr[k].isSource = !arr[k].isSource;
          setSrc(k)
          setData(arr);
        }
      })||destination&&(()=>{
        let arr = [...data]
        if (!(arr[k].isClicked && !arr[k].isDestination)) {
          if(dest!=-1){
            arr[dest].isClicked = !arr[dest].isClicked;
            arr[dest].isDestination = !arr[dest].isDestination;
          }
          arr[k].isClicked = !arr[k].isClicked;
          arr[k].isDestination = !arr[k].isDestination;
          setDest(k)
          setData(arr);
        }
      })||undefined}
    ></button>
  );
};

export default Cell;
