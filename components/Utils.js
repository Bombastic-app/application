export const generateGameCode = () => {
  let gameCode = '';
    for (let i = 0; i < 6; i++) {
      gameCode += Math.floor(Math.random() * 10);
    }
    return gameCode;
}