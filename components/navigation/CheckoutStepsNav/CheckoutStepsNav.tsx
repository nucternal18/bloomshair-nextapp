import { FC, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ICheckout {
  steps: string[];
  currentStep: number;
}

const CheckoutSteps: FC<ICheckout> = ({ steps, currentStep }): JSX.Element => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef(null);

  const updateStep = (stepCount: number, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepCount) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepCount) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepState = steps.map((step, index) => {
      return {
        description: step,
        completed: false,
        highlighted: index === 0 ? true : false,
        selected: index === 0 ? true : false,
      };
    });
    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={`${
          index !== newStep.length - 1
            ? " w-full flex items-center"
            : " flex items-center"
        }`}
      >
        <div className="relative flex flex-col items-center text-yellow-600">
          <div
            className={`${
              step.selected
                ? "bg-amber-600 text-white font-bold border border-amber-600"
                : ""
            } rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3`}
          >
            {step.selected ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`${
              step.highlighted
                ? "text-gray-900 dark:text-gray-200"
                : "text-gray-400"
            } absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`${
            step.completed ? "border-amber-600" : "border-gray-300"
          } flex-auto border-t-2 transition duration-500 ease-in-out`}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-4 mb-8 p-4 flex justify-between items-center  max-w-screen-xl sm:mx-auto">
      {displaySteps}
    </div>
  );
};

export default CheckoutSteps;
