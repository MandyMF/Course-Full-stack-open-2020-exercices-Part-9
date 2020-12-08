import React from "react";
import {CoursePart} from "../types";

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <>
      {courseParts.map((part)=>{
        return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
        )
      })}
    </>
  )
}

export default Content;