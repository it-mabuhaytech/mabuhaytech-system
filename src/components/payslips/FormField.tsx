import { ErrorType } from "./validation";

export const FormField = ({
  label,
  type,
  value,
  onChange,
  error,
  showBorderError = false,
  auto,
}: {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: ErrorType;
  showBorderError?: boolean;
  auto?: boolean;
}) => {
  const displayValue =
    type === "number" ? (value ?? 0).toString() : value ?? "";
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        disabled={auto}
        value={displayValue}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (type === "number") {
            const numValue = inputValue === "" ? 0 : Number(inputValue);
            onChange(numValue);
          } else {
            onChange(inputValue);
          }
        }}
        className={`w-full border rounded-lg p-2 ${
          error || showBorderError ? "border-red-500" : ""
        } disabled:cursor-not-allowed`}
      />
      <label className="block text-sm text-red-500 font-medium min-h-5">
        {error?.message}
      </label>
    </div>
  );
};
