import { FC, InputHTMLAttributes, ReactNode } from "react";
import { useTheme } from "@emotion/react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  errorText?: string;
  children?: ReactNode;
}

const FormField: FC<FormFieldProps> = ({ id, label, errorText, children }) => {
  const theme = useTheme();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={id}
        style={{
          color: theme.colors.text,
          display: "block",
          marginBottom: 4,
        }}
      >
        {label}
      </label>

      {children}

      {errorText && (
        <p style={{ color: theme.colors.error, marginTop: 4, fontSize: 14 }}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default FormField;
