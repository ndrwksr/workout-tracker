import React, { FunctionComponent, useState } from "react";
import { SetCard } from "./set";
import { Exercise } from "../models";
import { Icon } from "@iconify/react";
import caretDown from "@iconify-icons/ion/caret-down";
import { Transition } from "@headlessui/react";

export type ExerciseCardProps = { exercise: Exercise };

const ExerciseCardDetails: FunctionComponent<ExerciseCardProps> = ({
  exercise,
}) => (
  <div className="bg-white overflow-hidden shadow-inner divide-y">
    {exercise.sets.map((set, i) => (
      <SetCard key={i} set={set} i={i} />
    ))}
    <div
      className="border-t py-4 text-green-500 font-medium cursor-pointer"
      onClick={() => console.log("Add set")}
    >
      Add Set
    </div>
  </div>
);

export const ExerciseCard: FunctionComponent<ExerciseCardProps> = ({
  exercise,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="shadow flex flex-col divide-y h-auto border-gray-200">
      <div
        className="flex justify-between content-center flex-row"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col flex-grow text-left pl-4 py-3 font-medium">
          <div className="text-l">{exercise.name}</div>
          <div className="text-sm leading-5 text-gray-500">
            {exercise.sets.length} sets
          </div>
        </div>
        <div
          onClick={() => console.log(`Edit ${exercise.name}`)}
          className="px-2 py-4 whitespace-no-wrap my-auto align-middle text-m leading-5 font-medium text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </div>
        <div className="align-middle my-auto h-full px-2">
          <Icon
            icon={caretDown}
            vFlip={expanded}
            className="h-8 w-8 flex-shrink-0"
          />
        </div>
      </div>

      <Transition
        show={expanded}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref}>
            {exercise.sets.length > 0 ? (
              <ExerciseCardDetails exercise={exercise} />
            ) : undefined}
          </div>
        )}
      </Transition>
    </div>
  );
};
