interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartThreeAndOne {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartThreeAndOne {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartThreeAndOne extends CoursePartBase{
  description: string
}

interface MyCoursePart extends CoursePartThreeAndOne{
  name: "My Course Part!!"
  extraData: string
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;