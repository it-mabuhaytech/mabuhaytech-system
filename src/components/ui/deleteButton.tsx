import { useState } from "react";
import { useRouter } from "next/navigation";
import { Confirmation } from "./confirmation";

import { MdDelete } from "react-icons/md";

interface DeleteButtonProps {
  itemId: string | number;
  itemType: string;
  apiEndpoint: string;
  buttonText?: string;
  confirmMessage?: string;
  className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  itemId,
  itemType,
  apiEndpoint,
  confirmMessage,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/payslips");
      } else {
        throw new Error(`Failed to delete ${itemType}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <MdDelete
        onClick={() => setShowConfirmation(true)}
        className="text-red-500 hover:text-red-600"
        size={25}
      />

      <Confirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleDelete}
        title={`Delete ${itemType}`}
        message={
          confirmMessage || `Are you sure you want to delete this ${itemType}?`
        }
      />
    </>
  );
};

export default DeleteButton;
