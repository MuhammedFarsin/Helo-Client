import Navbar from "./Navbar";

function EditUserProfile() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center py-7">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6 sm:p-8">
          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image URL
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">upvox_</h2>
          <h3 className="text-blue-500 text-sm mb-6 cursor-pointer">Change profile photo</h3>

          {/* Form */}
          <form>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                placeholder="Display Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 text-xs mt-1">
                You can change your username back to upvox_ for another 14 days.
              </p>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Bio</label>
              <textarea
                rows="2"
                placeholder="Add a short bio"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 text-xs mt-1">0 / 150</p>
            </div>

            {/* Personal Information */}
            <div className="mb-4">
              <h4 className="text-gray-600 text-sm font-semibold">Personal information</h4>
              <p className="text-gray-500 text-xs mt-1">
                Provide your personal info. This won’t be public.
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Phone number</label>
              <input
                type="tel"
                placeholder="+91 971"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-1">Gender</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
