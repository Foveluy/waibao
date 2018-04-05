function GetDateStr(AddDayCount = 0, Type = 'day') {
  let dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
  let d = ''
  if (Type === 'day') {
    d = dd.getDate();
  } else if (Type === 'WeekDay') {
    d = dd.getDay()
  } else if (Type === 'fullDate') {
    let year = dd.getFullYear()
    let month = dd.getMonth() + 1
    d = year + '.' + month + '.' + dd.getDate()
  }
  return d;
}

function GetWeekDayStr(day) {
  let Wday = ['日', '一', '二', '三', '四', '五', '六']
  return Wday[day]
}

function GetSevenDate() {
  let ary = []
  for (let i = 0; i < 7; i++) {
    let component = {
      day: GetDateStr(i),
      weekDay: GetWeekDayStr(GetDateStr(i, 'WeekDay'))
    }
    ary.push(component)
  }
  return ary
}


function timeAry(){
  let pickerAry = [
    '0:00', '0:30',
    '1:00', '1:30', '2:00', '2:30',
    '3:00', '3:30', '4:00', '4:30',
    '5:00', '5:30', '6:00', '6:30',
    '7:00', '7:30', '8:00', '8:30',
    '9:00', '9:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30',
    '23:00', '23:30']
  return pickerAry
}

module.exports.GetSevenDate = GetSevenDate
module.exports.GetDateStr = GetDateStr
module.exports.timeAry = timeAry
