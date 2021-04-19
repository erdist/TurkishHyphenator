import "./App.css";
import { Divider, Form, Grid, Message } from "semantic-ui-react";
import { useState } from "react";

function App() {
  const [output, setOutput] = useState("");
  const [syllableCount, setSyllableCount] = useState(0);
  const vowels = /[aeıioöuüİ]/i;
  const vowelsForCounting = /[aeıioöuüİ]/gi;

  function countSyllables(text: string) {
    var result = text.match(vowelsForCounting);
    setSyllableCount(result === null ? 0 : result.length);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    var result: string[] = [];
    var text = e.target.value.split(" ");

    countSyllables(e.target.value);

    text.forEach((element) => {
      hyphenate(element, result);
    });
    setOutput(result.join(" | "));
  }

  function isVowel(value: string) {
    return vowels.test(value);
  }

  function hyphenate(input: string, result: string[]) {
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
    result.push(syllables.reverse().join(" - "));
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
            <Message.Header>Syllable Count: {syllableCount}</Message.Header>
            <p>{output}</p>
          </Message.List>
        </Grid.Column>
      </Grid>

      <Divider vertical>Turkish Hyphenator</Divider>
    </div>
  );
}

export default App;
