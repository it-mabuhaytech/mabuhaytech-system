// components/BackButton.tsx
"use client";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
            Go Back
        </button>
    );
};

export default BackButton;
