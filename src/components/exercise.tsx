import React, { FunctionComponent, useState } from "react";
import { SetCard } from "./set";
import { Exercise } from "../models";
import { Icon } from "@iconify/react";
import caretDown from "@iconify-icons/ion/caret-down";
import { AnimatePresence, motion } from "framer-motion";

export type ExerciseCardProps = { exercise: Exercise };

const ExerciseCardDetails: FunctionComponent<ExerciseCardProps> = ({
  exercise,
}) => (
  <>
    <motion.div
      layout
      className="bg-white overflow-hidden shadow-inner divide-y"
    >
      {exercise.sets.map((set, i) => (
        <SetCard key={i} set={set} i={i} />
      ))}
    </motion.div>
    <motion.div
      layout
      className="border-t py-4 cursor-pointer"
      onClick={() => console.log("Add set")}
    >
      {/* Inner div to decouple scaling anim from border-t on parent */}
      <motion.div
        className="text-green-500 font-medium "
        whileHover={{ scale: 1.05 }}
      >
        Add Set
      </motion.div>
    </motion.div>
  </>
);

export const ExerciseCard: FunctionComponent<ExerciseCardProps> = ({
  exercise,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <motion.div layout className="shadow flex flex-col h-auto border-gray-200">
      <motion.div
        layout
        className="flex justify-between content-center flex-row"
        onClick={() => setExpanded(!expanded)}
      >
        <motion.div
          layout
          className="flex flex-col flex-grow text-left pl-4 py-3 font-medium"
        >
          <div className="text-l">{exercise.name}</div>
          <div className="text-sm leading-5 text-gray-500">
            {exercise.sets.length} sets
          </div>
        </motion.div>
        <motion.div
          layout
          onClick={() => console.log(`Edit ${exercise.name}`)}
          className="px-2 py-4 whitespace-no-wrap my-auto align-middle text-m leading-5 font-medium text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </motion.div>
        <motion.div className="align-middle my-auto h-full px-2">
          <Icon
            icon={caretDown}
            vFlip={expanded}
            className="h-8 w-8 flex-shrink-0"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
          >
            <ExerciseCardDetails exercise={exercise} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
