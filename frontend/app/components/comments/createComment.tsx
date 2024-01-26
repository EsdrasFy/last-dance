import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBadgeRight } from "react-icons/tb";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import TextAreaUi from "../ui/textAreaUi";
import RatingUi from "../ui/ratingUi";

type Inputs = {
  cep: string;
};

const schema = yup.object().shape({
  cep: yup.string().required("This field is required!"),
});

function CreateComment() {
    const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const cep = data.cep;
    try {
      alert("cep pesquisado");
    } catch (error) {
      alert("cep nao pesquisado");
    } finally {
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <div>
      <button onClick={onOpen} className="flex items-center mt-3 gap-3 group">
        Evaluate Product{" "}
        <span className="text-xl text-custom-pink mt-0.5 duration-300 ease-linear  group-hover:translate-x-2">
          <TbArrowBadgeRight />
        </span>
      </button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        size={"3xl"}
        onClose={onClose}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="saturate(150%) blur(4px)"
          backdropInvert="50%"
          backdropBlur="3px"
        />
        <ModalContent
          backgroundColor={"#171a1b"}
          textColor={"#d9d9d9"}
          borderRadius={"4px"}
        >
          <ModalHeader>Make your comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextAreaUi
                label="Write a comment:"
                placeholder="Share more about what you think of the product to help other buyers."
                classname="w-full text-custom-textColor py-0 bg-custom-pink absolute top-0"
                name="credential"
                register={register}
                error={errors?.cep}
                autofocus={true}
                disabled={loading ? true : false}
              />
              <RatingUi/>
                </form>
          </ModalBody>

          <ModalFooter>
            <button>Save</button>
            <button onClick={onClose}>Cancel</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CreateComment;
