/**
 * код символа предшествующего 'A'. используется для преобразования символов 'A'..'H' в
 * числа 1..8 и для обратного преобразования
 */
const zeroColumnCode = 'A'.charCodeAt(0) - 1;

const positionToCoords = function positionToCoords(position) {
/**
 * преобразование строкового названия ячейки вида 'B2' в объект с координатами ячейки
 * вида { col: 2, row: 2 }
 */
  if (position.length !== 2) throw new Error();

  const col = position[0].toUpperCase();
  if (col < 'A' || col > 'H') throw new Error();

  const row = position[1];
  if (row < '1' || row > '8') throw new Error();

  return {
    col: col.charCodeAt(0) - zeroColumnCode,
    row: Number(row),
  };
};

const coordsToPosition = function coordsToPosition({ col, row }) {
/**
 * преобразование объекта с координатами ячейки вида { col: 2, row: 2 } в строковое название
 * ячейки вида 'B2'
 */
  return `${String.fromCharCode(zeroColumnCode + col)}${row}`;
};

// все потенциально возможные ходы коня
const moves = [[-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, -1], [-2, 1]];

const buttonClick = function buttonClick() {
// обработчик клика по кнопке

  // считываем название ячейки из поля ввода
  const position = document.forms[0].position.value.trim();
  if (position === '') return;

  // преобразуем название ячейки в координаты
  let col;
  let row;
  try {
    ({ col, row } = positionToCoords(position));
  } catch (e) {
    alert('Указано некорректное исходное положение');
    return;
  }

  /**
   * формируем массив координат возможных ходов коня, затем отбрасываем ячейки
   * выходящие за границы поля, далее преобразуем их в строковые названия и склеиваем в одну строку
   */
  const result = moves
    .map(([x, y]) => ({ col: col + x, row: row + y }))
    .filter(coords => Object.values(coords).every(coord => (coord >= 1 && coord <= 8)))
    .map(coords => coordsToPosition(coords))
    .join('  ');

  alert(`Возможные варианты хода:\n\n${result}`);
};

document.forms[0].button.addEventListener('click', buttonClick);
