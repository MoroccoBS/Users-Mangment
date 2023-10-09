"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
interface InputProps {
  name: string;
  placeholder?: string;
  onFocus: () => void;
  value?: string;
  setValue: (value: string) => void;
  errorText?: string;
  error?: boolean;
  type?: string;
}

export default function Input({
  name,
  placeholder,
  onFocus,
  value,
  setValue,
  error,
  type,
  errorText,
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordType = passwordVisible ? "text" : "password";
  return (
    <div className="w-full h-max flex-col flex gap-2 relative">
      <div className="w-full flex justify-between items-center flex-row-reverse">
        <h2
          className={`text-sm text-red-500 font-bold transition-all ${
            error
              ? "opacity-100 pointer-events-auto"
              : " opacity-0 pointer-events-none"
          }`}
        >
          {errorText}
        </h2>
        <h2 className="text-base text-MarineBlue ml-2">{name}</h2>
      </div>
      <input
        className={`${
          error ? "outline-red-500" : "outline-primary/75"
        } text-base font-bold focus:outline-primary rounded-xl py-3 px-4 placeholder:text-foreground/75 placeholder:text-base placeholder:font-normal focus:outline-none outline outline-1 bg-secondary`}
        type={type === "password" ? passwordType : type}
        placeholder={placeholder}
        onFocus={onFocus}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
