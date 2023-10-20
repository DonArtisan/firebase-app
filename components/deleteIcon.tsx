import Image from "next/image";
import DeleteIconSvg from "@/public/delete-modified.svg";

const DeleteIcon = () => {
  return (
    <div>
      <Image className="perrito" priority src={DeleteIconSvg} alt="Delete Icon" />
    </div>
  );
};

export default DeleteIcon;
