import React, { useState, ChangeEvent, FocusEvent, FC } from "react";
import { useTheme } from "@emotion/react";
import Card from "../task2/components/Card";
import { FormData, FormField } from "./models/FormData";
import Step1PersonalInfo from "./components/Step1PersonalInfo";
import Step2Address from "./components/Step2Address";
import Step3Confirmation from "./components/Step3Confirmation";

const fieldLabels: Record<FormField, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone number",
  billingAddress: "Address",
  billingCity: "City",
  billingState: "State",
  billingZip: "ZIP code",
  shippingAddress: "Address",
  shippingCity: "City",
  shippingState: "State",
  shippingZip: "ZIP code",
  sameAsBilling: "Shipping same as billing",
};

// to avoid prop drilling we can use a store or a context
// inline css for simplicity
const Task3: FC = () => {
  const theme = useTheme();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    sameAsBilling: true,
  });
  const [errors, setErrors] = useState<{ [k in FormField]?: string }>({});

  const validateField = (name: FormField, value: string): string => {
    let error = "";
    const label = fieldLabels[name] || name;

    if (["firstName", "lastName", "email", "phone"].includes(name)) {
      if (!value.trim()) error = `${label} is required`;
      if (
        name === "email" &&
        value &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ) {
        error = "Invalid email address";
      }
    }

    if (
      [
        "billingAddress",
        "billingCity",
        "billingState",
        "billingZip",
        "shippingAddress",
        "shippingCity",
        "shippingState",
        "shippingZip",
      ].includes(name)
    ) {
      if (!value.trim()) error = `${label} is required`;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };

      if (name === "sameAsBilling" && checked) {
        updated.shippingAddress = prev.billingAddress;
        updated.shippingCity = prev.billingCity;
        updated.shippingState = prev.billingState;
        updated.shippingZip = prev.billingZip;
      }

      if (name === "sameAsBilling" && !checked) {
        updated.shippingAddress = "";
        updated.shippingCity = "";
        updated.shippingState = "";
        updated.shippingZip = "";

        setErrors((prev) => ({
          ...prev,
          shippingAddress: undefined,
          shippingCity: undefined,
          shippingState: undefined,
          shippingZip: undefined,
        }));
      }

      return updated;
    });

    validateField(name as FormField, newValue.toString());
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as FormField, value);
  };

  const validateStep1 = (): boolean => {
    const fields: FormField[] = ["firstName", "lastName", "email", "phone"];
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field as keyof FormData] as string;
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const fields: FormField[] = [
      "billingAddress",
      "billingCity",
      "billingState",
      "billingZip",
    ];
    if (!formData.sameAsBilling) {
      fields.push(
        "shippingAddress",
        "shippingCity",
        "shippingState",
        "shippingZip"
      );
    }

    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field] as string;
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = step === 1 ? validateStep1() : validateStep2();
    if (isValid) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleReset = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",
      sameAsBilling: true,
    });
    setErrors({});
  };

  return (
    <Card style={{ backgroundColor: theme.colors.background }}>
      {step === 1 && (
        <Step1PersonalInfo
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <Step2Address
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <Step3Confirmation formData={formData} onReset={handleReset} />
      )}
    </Card>
  );
};

export default Task3;
