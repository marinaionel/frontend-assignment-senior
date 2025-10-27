import TextInput from "@/src/task2/components/TextInput";
import FormField from "../../FormField";
import { ChangeEvent, FC, FocusEvent } from "react";
import { FormData } from "@/src/task3/models/FormData";

interface AddressSectionProps {
  prefix: "billing" | "shipping";
  formData: FormData;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
}

const AddressSection: FC<AddressSectionProps> = ({ prefix, formData, errors, onChange, onBlur }) => (
  <>
    <h3>{prefix === "billing" ? "Billing" : "Shipping"}</h3>

    <FormField
      id={`${prefix}Address`}
      label="Address"
      required
      errorText={errors[`${prefix}Address`]}
    >
      <TextInput
        name={`${prefix}Address`}
        value={formData[`${prefix}Address`]}
        onChange={onChange}
        onBlur={onBlur}
        error={!!errors[`${prefix}Address`]}
        autoComplete={`${prefix} street-address`}
      />
    </FormField>

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
      <FormField
        id={`${prefix}City`}
        label="City"
        required
        errorText={errors[`${prefix}City`]}
      >
        <TextInput
          name={`${prefix}City`}
          value={formData[`${prefix}City`]}
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors[`${prefix}City`]}
          autoComplete={`${prefix} address-level2`}
        />
      </FormField>

      <FormField
        id={`${prefix}State`}
        label="State"
        required
        errorText={errors[`${prefix}State`]}
      >
        <TextInput
          name={`${prefix}State`}
          value={formData[`${prefix}State`]}
          onChange={onChange}
          onBlur={onBlur}
          error={!!errors[`${prefix}State`]}
          autoComplete={`${prefix} address-level1`}
        />
      </FormField>
    </div>

    <FormField
      id={`${prefix}Zip`}
      label="ZIP Code"
      required
      errorText={errors[`${prefix}Zip`]}
    >
      <TextInput
        name={`${prefix}Zip`}
        value={formData[`${prefix}Zip`]}
        onChange={onChange}
        onBlur={onBlur}
        error={!!errors[`${prefix}Zip`]}
        autoComplete={`${prefix} postal-code`}
      />
    </FormField>
  </>
);

export default AddressSection;