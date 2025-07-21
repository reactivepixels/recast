export const BlueprintCard = ({ children }) => {
  return (
    <div className="blueprint-card w-full h-full dark:bg-black/20">
      <div className="py-12 px-8">{children}</div>
    </div>
  );
};