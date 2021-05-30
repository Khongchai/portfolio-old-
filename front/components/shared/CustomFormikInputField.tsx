import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, useField } from "formik";
import React, { InputHTMLAttributes, useEffect } from "react";

type FormikFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
};

export const CustomFormikInputField: React.FC<FormikFieldProps> = ({
  name,
  placeholder,
  label,
  size: _,
  ...props
}) => {
  const [field] = useField(name);
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        type={name}
        {...props}
        {...field}
        id={name}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
