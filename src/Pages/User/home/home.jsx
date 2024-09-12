import { FaHome, FaSearch, FaCompass, FaEnvelope, FaHeart, FaPlusSquare, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import './home.css'; // Link to your CSS file for styling

function Home() {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* Main Feed */}
      <div className="feed">
        <Feed />
      </div>

      {/* Suggestions Sidebar */}
      <div className="suggestions">
        <Suggestions />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar__menu">
      <ul>
        <li><FaHome /> Home</li>
        <li><FaSearch /> Search</li>
        <li><FaCompass /> Explore</li>
        <li><FaEnvelope /> Messages</li>
        <li><FaHeart /> Notifications</li>
        <li><FaPlusSquare /> Create</li>
        <li><FaUser /> Profile</li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
}

function Feed() {
  return (
    <div className="feed__posts">
      <Post
        user="lewishamilton"
        image="https://yourimageurl.com/image1.jpg"
        caption="Ayrton Senna, meu ídolo!"
      />
      <Post
        user="kurzgesagt"
        image="https://yourimageurl.com/image2.jpg"
        caption="String Theory - The universe explained!"
      />
    </div>
  );
}

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <h3>@user</h3>
      </div>
      <img className="post__image" src='image' alt='user' />
      <p className="post__caption">caption</p>
    </div>
  );
}

function Suggestions() {
  return (
    <div className="suggestions__box">
      <h3>Suggestions For You</h3>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
        <li>User 4</li>
      </ul>
    </div>
  );
}

export default Home;
