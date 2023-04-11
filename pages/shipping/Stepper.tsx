import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "User login",
  "Shipping Address",
  "Payment method",
  "Place order",
];

function StepHandler({ activeStep, setActiveStep }: any) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, idx) => (
          <Step
            key={label}
            onClick={() =>
              activeStep > idx && idx > 0 ? setActiveStep(idx) : null
            }
            className="cursor-pointer"
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StepHandler;
