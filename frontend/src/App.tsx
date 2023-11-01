import { Index } from "./components/pages/index";
import { Header } from "./components/shared/Header";
import { Button } from "./components/shared/input/Button";
import { Card } from "./components/shared/input/Card";
import { MultiSelect } from "./components/shared/input/TagMultiSelect";
import { TextInput } from "./components/shared/input/TextInput";

function App() {
  return (
    <>
      <Header />
      <Index />
    </>
  );
}

export default App;

function TestComponents() {
  return (
    <>
      <Button>Hello</Button>
      <Button variant="PrimaryInverse">Hello</Button>
      <Button variant="Neutral">Hello</Button>
      <Button variant="NeutralInverse">Hello</Button>
      <Card>
        <h1 className="text-xl text-neutral-900">Add a note</h1>
        <TextInput name="name" inputLabel={"Name"} />
        <TextInput name="content" inputLabel={"Content"} lineCount={3} />
        <MultiSelect inputLabel={"Tags"} />
        <div className="flex justify-end gap-2 items-center">
          <Button variant="Neutral">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </Card>
    </>
  );
}
