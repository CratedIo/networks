"use client"

import * as React from "react"
import { useAuthContext } from "./context/AuthWrapper"


export function Test() {
  

  const { name, setName } = useAuthContext();

  return (
    <div>
      {name}
      <button onClick={() => setName('wilson')}>Change Name</button>
    </div>
  )
}
