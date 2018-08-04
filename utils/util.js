const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getRandomNumber = (max) => {
  let number = Math.ceil(Math.random() * max);
  return number;
}


const getPositionByNumber = (number, borders) => {
  let section = '';
  let minus = 0;

  // 计算区域
  if (number >= borders[0] && number <= borders[1]){
    section = 'A';
  } else if (number >= borders[2] && number <= borders[3]){
    section = 'B';
    minus = borders[1];
  } else if (number >= borders[4] && number <= borders[5]){
    section = 'C';
    minus = borders[3];
  } else if (number >= borders[6] && number <= borders[7]){
    section = 'D';
    minus = borders[5];
  } else {
    throw new Error(`unexpected seat number: ${number}`);
  }


  //计算具体位置（几排第几个座）
  let _number = number - minus;

  let row = Math.ceil((-49 + Math.sqrt(49*49 + 4*_number)) / 2);

  let seatsBefore = 0; // 之前行的座位总数
  if (row > 1){
    seatsBefore = 50*(row-1) + (row-1) * (row-2);
  }

  let column = _number - seatsBefore; // 当前行的

  let position = {
    number,
    section,
    row,
    column
  };

  return position;
}


module.exports = {
  formatTime,
  getRandomNumber,
  getPositionByNumber
}
