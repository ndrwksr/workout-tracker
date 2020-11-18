import React, { FC } from "react";
import { Workout } from "../models";
import { ExerciseCard } from "./exercise";
import { Link } from "react-router-dom";

type WorkoutCardProps = { workout: Workout; selected: boolean };

const WorkoutCard: FC<WorkoutCardProps> = ({ workout, selected }) => (
  <li className="flex w-auto">
    <div
      className={`px-4 py-4 cursor-pointer flex flex-col align-start w-full ${
        selected ? "bg-gray-100" : ""
      }`}
    >
      <span className="text-m text-left leading-5 font-medium text-gray-900">
        {workout.date.toLocaleDateString()}
      </span>
      <span className="text-sm text-left leading-5 text-gray-500">
        {workout.type}, {workout.exercises.length} exercises
      </span>
    </div>
  </li>
);

export type WorkoutListProps = {
  workouts: Workout[];
  selectedWorkout: Workout | undefined;
};

export const WorkoutList: FC<WorkoutListProps> = ({
  workouts,
  selectedWorkout,
}) => (
  <ul className="flex flex-col divide-y divide-gray-200">
    {workouts.map((workout, i) => {
      return (
        <Link to={`/workouts/${workout._id.toHexString()}`} key={i}>
          <WorkoutCard
            workout={workout}
            selected={
              selectedWorkout !== undefined &&
              selectedWorkout._id.equals(workout._id)
            }
          />
        </Link>
      );
    })}
  </ul>
);

export type WorkoutDetailsProps = {
  workout: Workout;
};

export const WorkoutDetails: FC<WorkoutDetailsProps> = ({ workout }) => (
  <div className="px-4 pt-4">
    <ul className="divide-y space-y-4 divide-gray-200">
      {workout.exercises.map((exercise, i) => (
        <li key={i}>
          <ExerciseCard exercise={exercise} />
        </li>
      ))}
    </ul>
  </div>
);
