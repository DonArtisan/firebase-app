import { Button, Textarea } from "@nextui-org/react";
import { app } from "@/lib/firebase-config";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface IFormInput {
  data: string;
}

const db = getFirestore(app);

const handleInfo = async (target: { data: string }) => {
  try {
    await addDoc(collection(db, "clips"), {
      ...target,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    alert(error);
  }
};

export default function TextAreaComponent() {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm<IFormInput>({
    defaultValues: { data: "" },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ data: "" });
    }
  }, [formState, reset]);

  return (
    <div className="bg-background/50 border-white/20 border-1 rounded-large p-4 h-full">
      <form onSubmit={handleSubmit(handleInfo)}>
        <Textarea
          variant="faded"
          label="Write your note"
          labelPlacement="outside"
          placeholder="Enter your note"
          className="min-w-full min-h-full"
          {...register("data", { required: true, maxLength: 100 })}
        />
        {errors.data && <p>{errors.data?.message}</p>}
        <Button
          className="w-full mt-4"
          color="success"
          type="submit"
          onClick={() => {
            setError("data", { type: "required" });
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
