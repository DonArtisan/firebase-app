import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Lottie from "lottie-web";
import deleteAnimationData from "@/assets/delete.json";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { app } from "@/lib/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(app);

const NoteList = () => {
  const [toDelete, setToDelete] = useState<Record<string, unknown> | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const container = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "clips"), (snapshot) => {
      const notes = [];
      snapshot.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });
      setData(notes);
    });
  }, []);

  useLayoutEffect(() => {
    if (!container.current) return;
    const animation = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: false,
      animationData: deleteAnimationData,
    });

    function onMouseEnter() {
      animation.play();
    }

    container.current.addEventListener("mouseenter", onMouseEnter);

    function onMouseLeave() {
      animation.stop();
    }

    container.current.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.current?.removeEventListener("mouseenter", onMouseEnter);
      container.current?.removeEventListener("mouseleave", onMouseLeave);
      animation?.destroy();
    };
  }, []);

  function handleDelete(note: Record<string, unknown>) {
    try {
      deleteDoc(doc(db, `clips/${note.id}`));
    } catch (error) {
      alert(error);
    }
  }

  function onDelete(note: Record<string, unknown>) {
    if (!note) return;
    setToDelete(note);
    onOpen();
  }
  return (
    <>
      {data.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <h1>My Notes</h1>
          {data.map((note) => (
            <Card
              key={note.id}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 w-full"
              shadow="sm"
            >
              <CardBody>
                <div className="gap-6 md:gap-4 items-center justify-center">
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-0">
                        <p className="text-small text-foreground/80">
                          {note.data}
                        </p>
                      </div>
                      <div>
                        <Button
                          isIconOnly
                          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                          radius="full"
                          variant="light"
                          onPress={() => onDelete(note)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12px"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </Button>
                        <Tooltip content="Copy to clipboard">
                        <Button
                          isIconOnly
                          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                          radius="full"
                          variant="light"
                          onPress={() =>
                            navigator.clipboard.writeText(note.data)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12px"
                            viewBox="0 0 448 512"
                          >
                            <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
                          </svg>
                        </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            radius="md"
            classNames={{
              body: "py-6",
              backdrop: "bg-[#F31260]/20 backdrop-opacity-10",
              base: "border-white/20 bg-[#fff] dark:bg-[#000] text-[#000] dark:text-[#fff]",
              header: "border-b-[1px] border-white/20",
              footer: "border-t-[1px] border-white/20",
              closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    DO YOU WANT TO DELETE THIS NOTE?
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      {(toDelete?.data as string) ??
                        "Are you sure you want to delete this?"}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="danger"
                      className="shadow-lg shadow-indigo-500/20"
                      onClick={() => {
                        if (toDelete) {
                          handleDelete(toDelete);
                        }

                        onClose();
                        setToDelete(null);
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Suspense>
      ) : (
        <div className="flex justify-center">Write your first note!</div>
      )}
    </>
  );
};

export default NoteList;
