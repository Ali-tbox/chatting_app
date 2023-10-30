import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const MainPage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default MainPage;
