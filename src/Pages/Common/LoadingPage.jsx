function LoadingPage() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-blink"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-blink animation-delay-200"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-blink animation-delay-400"></div>
      </div>
    </div>
  );
}

export default LoadingPage;
