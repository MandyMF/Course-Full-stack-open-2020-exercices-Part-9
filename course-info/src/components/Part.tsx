import React from "react";
import {CoursePart} from "../types"

const Part: React.FC<{part: CoursePart}> = ({part})=>{
  switch(part.name){
    case "Fundamentals":
      return (
        <>
        <p>
          Course Name: {part.name} 
        </p>
        <p>
          Number of Exercises: {part.exerciseCount}
        </p>
        <p>
          Description: {part.description}
        </p>
        <br/>
        </>
      );
    case "Using props to pass data":
        return (
          <>
          <p>
            Course Name: {part.name} 
          </p>
          <p>
            Number of Exercises: {part.exerciseCount}
          </p>
          <p>
            Group Project Count: {part.groupProjectCount}
          </p>
          <br/>
          </>
        );
    case "Deeper type usage":
      return (
        <>
        <p>
          Course Name: {part.name} 
        </p>
        <p>
          Number of Exercises: {part.exerciseCount}
        </p>
        <p>
          Description: {part.description}
        </p>
        <p>
          Exercise Submission Link: {part.exerciseSubmissionLink}
        </p>
        <br/>
        </>
      );
    case "My Course Part!!":
      return (        
      <>
        <p>
          Course Name: {part.name} 
        </p>
        <p>
          Number of Exercises: {part.exerciseCount}
        </p>
        <p>
          Description: {part.description}
        </p>
        <p>
          Extra Data: {part.extraData}
        </p>
        <br/>
        </>)
    default:
      return assertNever(part);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;