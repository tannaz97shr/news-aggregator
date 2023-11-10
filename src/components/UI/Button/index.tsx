interface ButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: Function;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({
  variant,
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`text-sm px-4 py-2 hover:shadow-lg rounded-lg border border-teal ${
        variant === "secondary"
          ? "bg-dark text-teal"
          : "bg-teal border-dark text-dark"
      } ${className && className}`}
      onClick={onClick ? () => onClick() : () => {}}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  );
}

export default Button;
