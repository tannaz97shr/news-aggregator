import Backdrop from "../Backdrop";

interface ModalProps {
  closeHandler: () => void;
  children: React.ReactNode;
}

const Modal = ({ closeHandler, children }: ModalProps) => {
  return (
    <>
      <Backdrop onClick={closeHandler} />
      <div className="p-4 bg-grey text-dark m-auto fixed left-0 right-0 z-40 w-[80%] md:w-2/3">
        {children}
      </div>
    </>
  );
};

export default Modal;
