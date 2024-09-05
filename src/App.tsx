import Form from "./components/Form/Form";
import Todolist from "./components/Todolist/Todolist";
import styled from "styled-components";

const MyApp = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

function App() {
  return (
    <MyApp>
      <Form />
      <Todolist />
    </MyApp>
  );
}

export default App;
