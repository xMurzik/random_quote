import React, { useEffect, useState } from "react";
import QuoteCard from "./components/quote-card/quote-card";
import randomColor from "randomcolor";

const App: React.FC = () => {
  const [color, setColor] = useState(randomColor());

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div>
      <QuoteCard color={color} setColor={setColor} />
    </div>
  );
};

export default App;
