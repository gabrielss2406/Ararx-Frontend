import React from "react";

interface ProfilePictureProps {
    handler: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ handler }) => {
    const generateColor = (handler: string) => {
        const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500"];
        const hash = handler.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    const initials = handler
        .split(" ")
        .map(word => word[0].toUpperCase())
        .join("")
        .slice(0, 2);

    return (
        <div
            className={`flex items-center justify-center h-full w-full rounded-full text-white font-bold ${generateColor(handler)} transition duration-300 ease-in-out transform hover:scale-110`}
        >
            {initials}
        </div>
    );
};

export default ProfilePicture;
