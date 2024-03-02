import '../../../styles/button.css';

interface ButtonProps {
  backgroundColor?: string;
  label: string;
  onClick?: () => void;
}

export const Button = ({
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className="primary-button"
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
