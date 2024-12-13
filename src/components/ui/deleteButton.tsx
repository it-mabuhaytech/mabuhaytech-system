import { useState } from "react";
import { useRouter } from "next/navigation";
import { Confirmation } from "./confirmation";

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
  className = "px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none",
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
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
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={isDeleting}
        className={className}
      >
        Delete
      </button>

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
