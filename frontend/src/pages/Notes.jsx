import Section from "../component/Section";
import Heading from "../component/Heading";

const Dashboard = () => {
    return (
      <Section>
        <div className="container">
        <Heading
          title="Your Notes"
          text="Coming Soon"
        />
        
        <progress className="progress w-516 bg-white"></progress>
        </div>
          </Section>
    );
  };
  
  export default Dashboard;
  