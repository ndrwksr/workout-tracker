import { Set } from "../models";
import React, { FunctionComponent } from "react";
import dumbbellIcon from "@iconify-icons/fa-solid/dumbbell";
import { Icon } from "@iconify/react";

type SetCardProps = { set: Set; i: number };

export const SetCard: FunctionComponent<SetCardProps> = ({ set, i }) => {
  const setNumber = (
    <div className="flex items-center justify-between">
      <div className="text-medium leading-5 font-medium text-indigo-600 truncate">
        Set #{i + 1}
      </div>
    </div>
  );

  const difficulty = set.difficulty ? (
    <div className="mt-2 sm:flex sm:justify-between">
      <div className="sm:flex">
        <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
          {/* Heroicon name: users */}
          <Icon
            icon={dumbbellIcon}
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
          />
          {set.difficulty}
        </div>
      </div>
    </div>
  ) : undefined;

  const actualColor =
    set.actualReps > set.targetReps
      ? "text-green-600"
      : set.actualReps < set.targetReps
      ? "text-red-700"
      : "text-black";
  const actualReps = <div className={actualColor}>{set.actualReps}</div>;
  const reps = (
    <div className="flex flex-row text-xl font-medium align-center h-auto py-4">
      {actualReps}/{set.targetReps}
    </div>
  );

  return (
    <a
      href="#"
      className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
    >
      <div className="flex flex-row pr-8 break-normal">
        <div className="flex-grow px-4 py-4 sm:px-6">
          {setNumber}
          {difficulty}
        </div>
        {reps}
      </div>
    </a>
  );
};
