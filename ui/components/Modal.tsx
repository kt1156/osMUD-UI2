import classNames from "classnames";
import React from "react";

interface ModalProps extends React.PropsWithChildren {
  id: string;
  title?: string;
  className?: string;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <button
        className={classNames("btn", props?.className)}
        onClick={() =>
          (document.getElementById(props.id) as HTMLDialogElement)?.showModal()
        }
      >
        {props?.title ?? "open modal"}
      </button>
      <dialog id={props.id} className="modal">
        <div className="modal-box">{props.children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
