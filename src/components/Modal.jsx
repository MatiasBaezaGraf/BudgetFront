import React, { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = props => {
    return (
        <Transition
            show={props.isOpen}
            enter='transition-opacity duration-275'
            enterFrom="opacity-0"
            leave='transition-opacity duration-275'
            leaveTo="opacity-0"
            as={Fragment}
        >
            <Dialog  
                onClose={props.isClosed} 
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className='text-white mx-auto max-w-sm rounded bg-stone-800 shadow-md p-4'>
                        <div className="flex flex-row justify-between items-center mb-4">
                            <Dialog.Title className='text-xl'>{props.title}</Dialog.Title>
                            <button onClick={props.isClosed}>
                                <XMarkIcon className="w-5 h-5 hover:text-gray-400"/>
                            </button>
                        </div>
                        {props.children}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
  )
};

export default Modal;