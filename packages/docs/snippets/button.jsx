export const Button = ({ children, ...props }) => {
  return (
    <div>
      Parent
      <div {...props}>{children}</div>
    </div>
  );
}