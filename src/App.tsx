import "./App.css";
import { Divider, Form, Grid, Message } from "semantic-ui-react";
import { useState } from "react";

function App() {
  const [output, setOutput] = useState("");
  let vovels = /[aeıioöuü]/i;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    hyphenate(e.target.value);
  }

  function isVowel(value: string) {
    return vovels.test(value);
  }

  function hyphenate(input: string) {
    var syllables: string[] = [];
    var letters: string[] = [];
    var i = input.length - 1;
    while (i >= 0) {
      if (isVowel(input[i])) {
        letters.push(input[i]);
        i--;
        if (i >= 0 && isVowel(input[i]) === false) {
          letters.push(input[i]);
          i--;
        }
        syllables.push(letters.reverse().join(""));
        letters = [];
      } else {
        letters.push(input[i]);
        if (i === 0) {
          syllables[syllables.length - 1] =
            input[i] + syllables[syllables.length - 1];
        }
        i--;
      }
    }
    var result = syllables.reverse().join(" - ");
    setOutput(result);
  }

  return (
    <div>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column width="8" stretched>
          <Form widths="equal">
            <Form.TextArea
              width="16"
              label="Your Text"
              onChange={handleChange}
              placeholder="Enter your text here..."
            ></Form.TextArea>
          </Form>
        </Grid.Column>

        <Grid.Column width="8" stretched>
          <Message.List>
            <Message.Header>Result</Message.Header>
            <p>{output}</p>
          </Message.List>
        </Grid.Column>
      </Grid>

      <Divider vertical>Turkish Hyphenator</Divider>
    </div>
  );
}

export default App;
