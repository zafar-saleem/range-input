"use client";

import RangeInput from "@/components/RangeInput";
import React from "react";

export default function Home() {
  const onChange = (value: number) => {
    console.log(value);
  };
  
  return (
    <main>
      <RangeInput
        min={0}
        max={100}
        onChange={onChange}
        initialValue={45}
        width={500}
      />
    </main>
  )
}
