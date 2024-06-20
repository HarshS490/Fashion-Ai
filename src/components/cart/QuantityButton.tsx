"use client";
import React, { useState,ChangeEvent } from "react";
import { Button } from "../ui/button";
import {
    PlusIcon,
    MinusIcon
} from "lucide-react"

type Props = {
	count:number
};

const QuantityButton = (props: Props) => {
	const [count,setCount] = useState(1);
	const handleIncrement = ()=>{
		setCount(count+1);
	}
	const handleDecrement = ()=>{
		setCount(count-1);
	}
	const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
		const inputValue = parseInt(e.target.value);
    if(!isNaN(inputValue)){
      setCount(inputValue);
    }
	}
  return (
    <div className="w-28 flex justify-between border-gray-200 border rounded-md">
      <Button
        variant={"ghost"}
        size={"icon"}
				className="w-8 h-8"
        onClick={handleIncrement}
        disabled={count >= Math.min(6, props.count)}
      >
        {<PlusIcon></PlusIcon>}
      </Button>
      <input
        className="min-w-8 max-w-min w-8 text-center focus:outline-none"
        onChange={handleChange}
        value={count}
      />
      <Button
        variant={"ghost"}
        size={"icon"}
				className="w-8 h-8"
        onClick={handleDecrement}
        disabled={count <= 1}
      >
        {<MinusIcon></MinusIcon>}
      </Button>
    </div>
  );
};

export default QuantityButton;