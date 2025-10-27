import React, { ChangeEvent, FC } from "react";
import { useTheme } from "@emotion/react";
import { FaArrowRight } from "react-icons/fa";
import FormField from "../FormField";
import TextInput from "@/src/task2/components/TextInput";
import { FormData } from "../../models/FormData";
import Button from "@/src/task2/components/Button";

interface Step1Props {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onNext: () => void;
}

const Step1PersonalInfo: FC<Step1Props> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onNext,
}) => {
  const theme = useTheme();

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
        Personal Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <FormField
          id="fname"
          label="First Name"
          required
          errorText={errors.firstName}
        >
          <TextInput
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
            autoComplete="given-name"
          />
        </FormField>

        <FormField
          id="lname"
          label="Last Name"
          required
          errorText={errors.lastName}
        >
          <TextInput
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.lastName}
            autoComplete="family-name"
          />
        </FormField>
      </div>

      <FormField id="email" label="Email" required errorText={errors.email}>
        <TextInput
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.email}
          autoComplete="email"
        />
      </FormField>

      <FormField id="phone" label="Phone" required errorText={errors.phone}>
        <TextInput
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors.phone}
          autoComplete="tel"
        />
      </FormField>

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "1rem",
        }}
      >
        <Button onClick={onNext} icon={<FaArrowRight />} iconPosition="right">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
