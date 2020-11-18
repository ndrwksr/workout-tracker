import React from "react";
import "./App.css";
import { ObjectId } from "bson";
import { Workout } from "./models";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { WorkoutList, WorkoutDetails } from "./components/workout";
import caretBack from "@iconify-icons/ion/caret-back";
import { Icon } from "@iconify/react";

const myWorkouts: Workout[] = [
  {
    _id: new ObjectId(),
    date: new Date(),
    type: "Upper Body",
    exercises: [
      {
        name: "Dumbbell Curl",
        sets: [
          {
            difficulty: "10kg",
            targetReps: 5,
            actualReps: 5,
          },
          {
            difficulty: "10kg",
            targetReps: 7,
            actualReps: 8,
          },
          {
            difficulty: "15kg",
            targetReps: 5,
            actualReps: 4,
          },
        ],
      },
      {
        name: "Pullup",
        sets: [
          {
            targetReps: 6,
            actualReps: 7,
          },
          {
            targetReps: 8,
            actualReps: 8,
          },
          {
            targetReps: 8,
            actualReps: 8,
          },
        ],
      },
      {
        name: "Dumbell Tricep Raise",
        sets: [
          {
            targetReps: 15,
            actualReps: 15,
          },
          {
            targetReps: 15,
            actualReps: 15,
          },
          {
            targetReps: 15,
            actualReps: 15,
          },
        ],
      },
      {
        name: "Shoulder Fly",
        sets: [],
      },
    ],
  },
  {
    _id: new ObjectId(),
    date: new Date(),
    type: "Lower Body",
    exercises: [],
  },
];

const emptyDetails = (
  <div className="object-center text-opacity-25 h-full w-full">Empty!</div>
);
const noExerciseDetails = "No sets!";

function App() {
  const workoutMatch = useRouteMatch<{ id: string }>("/workouts/:id");
  console.log(workoutMatch);
  const workout =
    workoutMatch !== null
      ? myWorkouts.find((workout) =>
          workout._id.equals(new ObjectId(workoutMatch.params.id))
        )
      : undefined;
  console.log(workout);

  const workoutDetails =
    workout !== undefined ? (
      workout.exercises.length !== 0 ? (
        <WorkoutDetails workout={workout} />
      ) : (
        noExerciseDetails
      )
    ) : (
      emptyDetails
    );

  return (
    <>
      <header>
        <div className="flex flex-row h-auto w-full md:flex md:items-center md:justify-between border border-b px-4 py-4">
          {workout !== undefined ? (
            <Link className="sm:hidden pr-4" to="../..">
              <Icon icon={caretBack} className="h-8 w-8 flex-shrink-0" />
            </Link>
          ) : undefined}

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
              My Workouts
            </h2>
          </div>
        </div>
      </header>

      <div className="flex mb-4 App h-screen">
        <div className="hidden sm:flex sm:flex-row w-full">
          <div className="w-1/3 border-r">
            <WorkoutList workouts={myWorkouts} selectedWorkout={workout} />
          </div>
          <div className="w-2/3">{workoutDetails}</div>
        </div>
        <div className="sm:hidden w-full">
          <Switch>
            <Route exact path={"/workouts"}>
              <WorkoutList workouts={myWorkouts} selectedWorkout={workout} />
            </Route>
            <Route path={"/workouts/:id"}>{workoutDetails}</Route>
            <Redirect exact from="/" to="/workouts" />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
