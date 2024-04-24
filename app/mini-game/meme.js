import BaseScreen from "../../components/base/BaseScreen";
import { useEffect, useState } from "react";
import { MiniGameMemeSetup } from "../../pages/MiniGames/Meme/Setup";
import { MiniGameMemeChoice } from "../../pages/MiniGames/Meme/Choice";

export default MiniGameMeme = () => {
  const [step, setStep] = useState(1)

  useEffect(() => {
    console.log(step);
  }, [step])

  return (
    <BaseScreen>
      { step === 1 && <MiniGameMemeSetup updateStep={setStep} /> }
      { step === 2 && <MiniGameMemeChoice updateStep={setStep} /> }
    </BaseScreen>
  );
};
