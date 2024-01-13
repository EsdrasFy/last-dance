"use client"
import React from 'react'

function page({params}:any) {
  console.log(params);
  
  return (
    <div>page {params.slug}</div>
  )
}

export default page