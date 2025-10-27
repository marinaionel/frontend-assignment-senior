import React, { ChangeEvent, FC, FocusEvent } from "react";
import { useTheme } from "@emotion/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FormData } from "../../models/FormData";
import { Checkbox } from "@/src/task2/components/Checkbox";
import Button from "@/src/task2/components/Button";
import AddressSection from "./AddressSection";

interface Step2Props {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Address: FC<Step2Props> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onNext,
  onBack,
}) => {
  const theme = useTheme();

  const headerStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: "1.5rem",
  } as const;

  return (
    <div>
      <h2 style={headerStyle}>Address</h2>

      <AddressSection
        prefix="billing"
        formData={formData}
        errors={errors}
        onChange={onChange}
        onBlur={onBlur}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <Checkbox
          name="sameAsBilling"
          checked={formData.sameAsBilling}
          onChange={onChange}
        />
        <label style={{ color: theme.colors.text }}>
          Shipping same as billing
        </label>
      </div>

      {!formData.sameAsBilling && (
        <AddressSection
          prefix="shipping"
          formData={formData}
          errors={errors}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "1rem",
          gap: 8,
        }}
      >
        <Button icon={<FaArrowRight />} iconPosition="right" onClick={onNext}>
          Next
        </Button>
        <Button onClick={onBack} variant="outlined" icon={<FaArrowLeft />}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Step2Address;
