function AuthShimmerUI() {
    return (
        <div className="relative w-full h-10 bg-gray-200 overflow-hidden rounded-lg">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
        </div>
      );
}

export default AuthShimmerUI
