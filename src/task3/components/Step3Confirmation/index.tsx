import React, { FC, useState } from "react";
import { useTheme } from "@emotion/react";
import { FormData } from "../../models/FormData";
import Button from "@/src/task2/components/Button";

interface Step3Props {
  formData: FormData;
  onReset: () => void;
}

const Step3Confirmation: FC<Step3Props> = ({ formData, onReset }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onReset();
      alert("Your form was successfully submitted!");
    }, 1500);
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: theme.colors.text,
          marginBottom: "1.5rem",
        }}
      >
        Confirmation
      </h2>

      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(formData, null, 2)}
      </pre>

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "1rem",
          gap: 8,
        }}
      >
        <Button onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>

        <Button onClick={onReset} variant="outlined">Start New Form</Button>
      </div>
    </div>
  );
};

export default Step3Confirmation;
