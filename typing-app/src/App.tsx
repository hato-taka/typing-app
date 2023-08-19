import { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import "./App.css";

function App() {
  // お題
  const [text, setText] = useState("testhogepiyo");
  // タイプした文字
  const [typing, setTyping] = useState<string>("");

  const [position, setPosition] = useState<number>(0);

  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const reset = () => {
    console.log("reset");
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input_key = e.code;
    const key = input_key.slice(3);

    if (position > text.length - 1) {
      console.log("配列範囲外エラー");
      return;
    }
    if (key > "Z" || key < "A") {
      console.log("入力範囲外エラー");
      return;
    }

    // 入力した文字がお題と合っているか判定する
    const textArray = text.split("");
    if (textArray[position].toUpperCase() === key) {
      console.log("correct");
      setIsCorrect(true);
      setTyping((prev) => prev + key);
      // ここにtextを分割する処理を書く
      const copyText = textArray.slice(0, position + 1);
      console.log(copyText);

      setPosition(position + 1);
    } else {
      console.log("wrong");
      setIsCorrect(false);
      return;
    }
  };

  // textのコピーを作る
  // textをpositionの値で半分に分割
  // text[0] に class = correct
  // (text[1] に class = wrong を付与する)
  // <span>{text[0]}</span> text[1]でそれぞれ出力する

  return (
    <>
      <Box w="500px" h="500px" bg="lightgray">
        <Text textAlign="center">{text}</Text>
        <Text textAlign="center">
          {text.split("").map((char) => {
            if (isCorrect) {
              return <span className="correct">{char}</span>;
            } else {
              return <span>{char}</span>;
            }
          })}
        </Text>
        <Text textAlign="center">{typing}</Text>
        <div
          className="container"
          tabIndex={0}
          onKeyDown={keyDownHandler}
          style={{
            background: "tomato",
            height: "30px",
            color: "white",
            textAlign: "center",
          }}
        >
          Start
        </div>
      </Box>
      <Button marginTop={4} onClick={() => reset()}>
        リセット
      </Button>
    </>
  );
}

export default App;
