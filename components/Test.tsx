"use client"

import * as React from "react"
import { useAuthContext } from "./context/AuthWrapper"
import {useRef, useEffect} from 'react';


export default function TestScroll({targetId}:any) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView();
    }
  }, [targetId]);
  return null
};