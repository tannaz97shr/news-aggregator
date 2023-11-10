interface BackdropProps {
  onClick: () => void;
}

function Backdrop({ onClick }: BackdropProps) {
  return (
    <div
      onClick={onClick}
      className="h-[100vh] w-[100vw] fixed left-0 z-30 top-0 bg-backdrop"
    />
  );
}

export default Backdrop;
