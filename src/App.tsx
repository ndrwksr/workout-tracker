import React, { FC, useState } from "react";
import "./App.css";
import { ObjectId } from "bson";
import { Workout } from "./models";
import { matchPath } from "react-router";
import { Icon } from "@iconify/react";
import addItemIcon from "@iconify-icons/ion/add-circle-outline";

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";
import { WorkoutList, WorkoutDetails } from "./components/workout";
import caretBack from "@iconify-icons/ion/caret-back";
import arrowLeftA from "@iconify-icons/ion/arrow-left-a";
import { AnimatePresence, motion, MotionStyle, Variants } from "framer-motion";
import { useInterval } from "./shared/useInterval";
import { useBreakpoint } from "./shared/useWindowSize";

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

const NoExercisesDetails: FC = () => {
  type Displacement = 0 | -25;
  const displacement: Displacement = -25;
  const [y, setY] = useState<Displacement>(-25);

  useInterval(() => {
    setY(y === 0 ? displacement : 0);
  }, 2000);

  // <div className="w-full pl-12 pt-12 flex">
  //   <div className="flex opacity-50 space-x-10">
  //     {
  //       <>
  //         <motion.div
  //           animate={{ y }}
  //           variants={{
  //             0: { translateX: 0 },
  //             [displacement]: { translateX: displacement },
  //           }}
  //           transition={{
  //             ease: "easeInOut",
  //             duration: 1.9,
  //           }}
  //           onClick={() => setY(y === 0 ? displacement : 0)}
  //           className="flex-0 my-auto place-content-center h-16 w-16 "
  //         >
  //           <Icon icon={arrowLeftA} color="gray" className="h-16 w-16" />
  //         </motion.div>
  //         <div className="flex-auto text-gray-500 mx-auto my-auto text-xl">
  //           Add a
  //         </div>
  //       </>
  //     }
  //   </div>
  // </div>

  return <></>;
};

const NoWorkoutDetails: FC = () => {
  type Displacement = 0 | -25;
  const displacement: Displacement = -25;
  const [x, setX] = useState<Displacement>(-25);

  useInterval(() => {
    setX(x === 0 ? displacement : 0);
  }, 2000);

  return (
    <div className="w-full pl-12 pt-12 flex">
      <div className="flex opacity-50 space-x-10">
        {
          <>
            <motion.div
              animate={{ x }}
              variants={{
                0: { translateX: 0 },
                [displacement]: { translateX: displacement },
              }}
              transition={{
                ease: "easeInOut",
                duration: 1.9,
              }}
              onClick={() => setX(x === 0 ? displacement : 0)}
              className="flex-0 my-auto place-content-center h-16 w-16 "
            >
              <Icon icon={arrowLeftA} color="gray" className="h-16 w-16" />
            </motion.div>
            <div className="flex-auto text-gray-500 mx-auto my-auto text-xl">
              Select a workout
            </div>
          </>
        }
      </div>
    </div>
  );
};

const AppHeader: FC = () => {
  const location = useLocation();
  const pathMatch = matchPath(location.pathname, "/workouts/:id");
  const backButtonAnimState = pathMatch !== null ? "show" : "hide";

  const backButtonVariants: Variants = {
    hide: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  const breakpoint = useBreakpoint();
  let titleAnimState;
  if (breakpoint === "sm") {
    titleAnimState = backButtonAnimState;
  } else titleAnimState = "inactive";

  const backButton = (
    <AnimatePresence>
      <motion.div
        layout
        animate={backButtonAnimState}
        variants={backButtonVariants}
        transition={{
          ease: "easeInOut",
          duration: 0.25,
        }}
        className="sm:hidden w-12 h-12 my-auto"
      >
        <Link className="sm:hidden h-auto my-auto" to="/workouts">
          <Icon icon={caretBack} className="h-12 w-12 pl-4" color="white" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );

  const title = (
    <motion.h2
      animate={titleAnimState}
      variants={{
        hide: { translateX: -48 },
        show: { translateX: 0 },
        inactive: { translateX: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      className="min-w-0 px-4 py-4 text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate"
    >
      My Workouts
    </motion.h2>
  );

  const addWorkoutButton = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
      className="flex-0 flex justify-end col-span-1"
    >
      <div className="p-1 m-auto justify-items-center content-center">
        {breakpoint === "sm" ? (
          <Icon
            icon={addItemIcon}
            className="sm:hidden w-12 h-12"
            color="white"
          />
        ) : (
          <div className="text-white font-medium hidden rounded-lg p-2 sm:block border-2 border-white shadow">
            Add Workout
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <header className="sticky top-0">
      <div
        className="grid grid-cols-4 h-auto items-center border-b
        bg-gradient-to-r from-green-700 to-green-300"
      >
        <div className="flex flex-row col-span-3">
          {backButton}
          {title}
        </div>
        {addWorkoutButton}
      </div>
    </header>
  );
};

function App() {
  const location = useLocation();

  const workoutMatch = useRouteMatch<{ id: string }>("/workouts/:id");
  console.log(workoutMatch);

  const workout =
    workoutMatch !== null
      ? myWorkouts.find((workout) =>
          workout._id.equals(new ObjectId(workoutMatch.params.id))
        )
      : undefined;
  console.log(workout);

  let workoutDetails;
  if (workout === undefined) workoutDetails = <NoWorkoutDetails />;
  else if (workout.exercises.length === 0)
    workoutDetails = <NoExercisesDetails />;
  else workoutDetails = <WorkoutDetails workout={workout} />;

  const pageStyle: MotionStyle = {
    position: "absolute",
  };
  const leftPageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "-100vw",
    },
  };
  const rightPageVariants = {
    initial: {
      opacity: 0,
      x: "100vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "100vw",
    },
  };
  const pageTransition = {
    ease: "easeInOut",
    duration: 0.25,
  };

  const breakpoint = useBreakpoint();

  const smBody = (
    <div className="sm:hidden h-full w-full">
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route exact path={"/workouts"}>
            <motion.div
              style={pageStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={leftPageVariants}
              transition={pageTransition}
              className="w-full"
            >
              <WorkoutList workouts={myWorkouts} selectedWorkout={workout} />
            </motion.div>
          </Route>
          <Route path={"/workouts/:id"}>
            <motion.div
              style={pageStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={rightPageVariants}
              transition={pageTransition}
              className="w-full"
            >
              {workoutDetails}
            </motion.div>
          </Route>

          <Redirect exact from="/" to="/workouts" />
        </Switch>
      </AnimatePresence>
    </div>
  );

  const body = (
    <div className="hidden sm:flex sm:flex-row h-full w-full">
      <div className="sm:w-1/3 border-r">
        <WorkoutList workouts={myWorkouts} selectedWorkout={workout} />
      </div>
      <div className="w-2/3">{workoutDetails}</div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col mb-4 App h-screen">
        <AppHeader />
        {breakpoint === "sm" ? smBody : body}
      </div>
    </>
  );
}

export default App;
