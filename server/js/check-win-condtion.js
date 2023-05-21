module.exports = checkWinCondition

function checkWinCondition(state) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return `${state[a]} winner`
    }
  }

  if (state.every(cell => cell)) {
    return "Standoff"
  }

  return state;
}

