import React from "react";

const AskedQuestions = () => {
  return (
    <div className="mx-5 md:mx-auto md:max-w-2xl my-8">
        <h1 className="text-4xl font-bold text-primary text-center my-5">Frequently Asked Questions</h1>
      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-base-100 border-base-300 border"
      >
        <div className="collapse-title font-semibold">
          Who Can donate Blood?
        </div>
        <div className="collapse-content text-sm">
          Ages 18-60, weight 50kg+, good health. No recent tattoos or travel to
          high-risk areas.
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-base-100 border-base-300 border"
      >
        <div className="collapse-title font-semibold">
          How Often can i donet?
        </div>
        <div className="collapse-content text-sm">
          Whole blood: Every 3 months for men, 4 months for women. Platelets:
          More frequently.
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow bg-base-100 border-base-300 border"
      >
        <div className="collapse-title font-semibold">
          Is it safe of Donate?
        </div>
        <div className="collapse-content text-sm">
          Yes, with sterile equipment and professional screening. Benefits
          outweigh minor side effects.
        </div>
      </div>
    </div>
  );
};

export default AskedQuestions;
