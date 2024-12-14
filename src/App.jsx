import { useEffect, useState,useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useMemo } from "react";
import Cell from "./components/Cell";

function App() {
  
  const grid = useMemo(() => {
    const arr = [];
    console.log("hello")
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 42; j++) {
        const cell = {
          up: i === 0 ? undefined : 42 * (i - 1) + j,
          down: i === 17 ? undefined : 42 * (i + 1) + j,
          left: j === 0 ? undefined : 42 * i + (j - 1),
          right: j === 41 ? undefined : 42 * i + (j + 1),
          isClicked: false,
          isObstacle: false,
          isSource: false,
          isDestination: false,
          visited: false,
          dist: Infinity,
          inPath: false
        };
        arr.push(cell);
      }
    }
    return arr;
  }, []); 
   
  const [data, setData] = useState(grid)
  const [obstacles,setObstacles] = useState(false)
  const [source,setSource] = useState(false)
  const [destination,setDestination] = useState(false)
  const [path,setPath] = useState(false)
  const [src,setSrc] = useState(-1)
  const [dest,setDest] = useState(-1)
  const [dragging, setDragging] = useState(false);
  const [shortestPath,setshortestPath] = useState([])
  
  const handleDragStart = () => setDragging(true);
  
  const handleDragEnd = () =>  setDragging(false);

  const minDistance = (arr) => {
    let min = Infinity
    let minIndex = -1
    for (let index = 0; index < 756; index++) {
      if(!arr[index].visited&&arr[index].dist<=min){
        min = arr[index].dist
        minIndex = index
      }
    }
    return minIndex
  }
  
  const findPath = async (src,dest) => {
    let arr = [...data]
    arr[src].dist = 0
    let previous = Array(arr.length).fill(null);
    while(!arr[dest].visited){
      let u = minDistance(arr);
      if (u === -1 || arr[u] === undefined) {
        console.error(`Invalid cell index u: ${u}`);
        break;
      }
      arr[u].visited = true
      await new Promise((res,rej)=>setTimeout(() => res(""),50))
      setData([...arr]);
      const { up, down, left, right } = arr[u]
      if(up!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[up].isObstacle)&&(!arr[up].visited)&&(arr[up].dist>arr[u].dist+1)){
          arr[up].dist = arr[u].dist + 1
          previous[up] = u
        }
      }        
      if(down!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[down].isObstacle)&&(!arr[down].visited)&&(arr[down].dist>arr[u].dist+1)){
          arr[down].dist = arr[u].dist + 1
          previous[down] = u;
        }
      }   
      if(left!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[left].isObstacle)&&(!arr[left].visited)&&(arr[left].dist>arr[u].dist+1)){
          arr[left].dist = arr[u].dist + 1
          previous[left] = u;
        }
      }       
      if(right!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[right].isObstacle)&&(!arr[right].visited)&&(arr[right].dist>arr[u].dist+1)){
          arr[right].dist = arr[u].dist + 1
          previous[right] = u;
        }
      }       
    }
    let path = [];
    for (let at = dest; at !== null; at = previous[at]) {
        path.push(at); 
    }       
    path.reverse();
    for (let index = 0; index < path.length; index++){ 
      arr[path[index]].inPath = true
      await new Promise((res,rej)=>setTimeout(() => res(""),500))
      setData([...arr]);
    }
    console.log(data[dest].dist)
  };
  
  return (
    <>
      <div onMouseDown={handleDragStart} onMouseUp={handleDragEnd} className="flex flex-wrap">{data.map((item,index)=><Cell key={index} item={item} k={index} setData={setData} data={data} obstacles={obstacles} source={source} destination={destination} dragging={dragging} src={src} setSrc={setSrc} dest={dest} setDest={setDest}/>)}</div>
      <button className={(obstacles?"bg-green-400":"")+" rounded-full mx-8 my-4 border border-black w-28 inline-block p-4 "} onClick={()=>{
        setObstacles(true)
        setSource(false)
        setDestination(false)
        setPath(false)
      }}>obstacles</button>
      <button className={(source?"bg-green-400":"")+" rounded-full mx-8 my-4 border border-black w-28 inline-block p-4"} onClick={()=>{
        setSource(true)
        setDestination(false)
        setObstacles(false)
        setPath(false)
      }}>Source</button>
      <button className={(destination?"bg-green-400":"")+" rounded-full mx-8 my-4 border border-black w-28 inline-block p-4"} onClick={()=>{
        setDestination(true)
        setObstacles(false)
        setSource(false)
        setPath(false)
      }}>Destination</button>
      <button className={(path?"bg-green-400":"")+" rounded-full mx-8 my-4 border border-black w-28 inline-block p-4"} onClick={()=>{
        setPath(true)
        setDestination(false)
        setObstacles(false)
        setSource(false)
        console.log(src)
        console.log(dest)
        if(src!=-1&&dest!=-1)
          findPath(src,dest)      
        else
          console.log("sorry source or destination is not defined")
      }}>Path</button>
    </>
  );
}

export default App;

/* const arr = useMemo(() => 
    Array.from({ length: 756 }, () => ({ value: false, isObstacle: false }))
  , []);
  if(arr[u].up!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[u.up].isObstacle)&&(!arr[u.up].visited)&&(arr[u.up].dist>arr[u].dist+1))
          arr[u.up].dist = arr[u].dist + 1
      }        
      if(arr[u].down!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[u.down].isObstacle)&&(!arr[u.down].visited)&&(arr[u.down].dist>arr[u].dist+1))
          arr[u.down].dist = arr[u].dist + 1
      }   
      if(arr[u].left!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[u.left].isObstacle)&&(!arr[u.left].visited)&&(arr[u.left].dist>arr[u].dist+1))
          arr[u.left].dist = arr[u].dist + 1
      }       
      if(arr[u].right!=undefined){
        if((arr[u].dist!=Infinity)&&(!arr[u.right].isObstacle)&&(!arr[u.right].visited)&&(arr[u.right].dist>arr[u].dist+1))
          arr[u.right].dist = arr[u].dist + 1
      }       
    }
*/
/*
const findPath = (arr,u,dest,arrPath)=>{
    if (u === dest) {
      if (shortestPathRef.current.length === 0) {
        shortestPathRef.current = [...arrPath];
      } else if (arrPath.length < shortestPathRef.current.length) {
        shortestPathRef.current = [...arrPath];
      }
    }
    const { up, down, left, right } = arr[u]
    if((up!=undefined)&&(!arr[up].isObstacle)&&(!arr[up].visited)){
      arr[up].visited = true
      arrPath.push(up)
      findPath(arr,up,dest,arrPath)
    }
    if((down!=undefined)&&(!arr[down].isObstacle)&&(!arr[down].visited)){
      arr[down].visited = true
      arrPath.push(down)
      findPath(arr,down,dest,arrPath)
    }
    if((left!=undefined)&&(!arr[left].isObstacle)&&(!arr[left].visited)){
      arr[left].visited = true
      arrPath.push(left)
      findPath(arr,left,dest,arrPath)
    }
    if((right!=undefined)&&(!arr[right].isObstacle)&&(!arr[right].visited)){
      arr[right].visited = true
      arrPath.push(right)
      findPath(arr,right,dest,arrPath)
    }
    arr[u].visited = false
    arrPath.pop()
  }

*/
/*
setShortestPath([...arrPath]);
*/