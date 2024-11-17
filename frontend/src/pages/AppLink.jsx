import Section from "../component/Section";
import Heading from "../component/Heading";

const Dashboard = () => {
    return (
      <Section>
        <div className="container">
        <Heading
          title="App is coming soon"
          text="On playstore"
        />
        
        <progress className="progress w-516 bg-white"></progress>
        </div>
          </Section>
    );
  };
  
  export default Dashboard;
  