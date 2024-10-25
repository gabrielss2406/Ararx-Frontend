import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ label }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-800 bg-opacity-20 backdrop-blur-md">
            <Loader2 className="animate-spin h-12 w-12 text-white" />
            {label && <span className="ml-4 text-white">{label}</span>}
        </div>
    );
};