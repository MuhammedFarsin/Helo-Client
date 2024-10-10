import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      {isLoading && (
        <div className="animate-pulse flex flex-col items-center">
          <div className="bg-gray-300 h-32 w-1/3 max-w-sm rounded-md mb-4"></div>
          <div className="bg-gray-300 h-10 w-1/4 rounded-md"></div>
        </div>
      )}

      <img
        src="/src/assets/imageProject/PageNotFound2.jpg"
        alt="Page Not Found"
        className={`w-1/3 max-w-sm mb-4 ${isLoading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
      />
      <button
        onClick={handleBackToHome}
        className={`px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition ${
          isLoading ? "hidden" : "block"
        }`}
      >
        Back to Home
      </button>
    </div>
  );
}

export default PageNotFound;
