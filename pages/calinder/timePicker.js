function timePick(time, one, two, Type) {
  let times = time
  let a = 0
  let b = 0
  for (let row in times) {
    if (times[row].time == one) a = row
    if (times[row].time == two) b = row
  }

  a = parseInt(a)
  b = parseInt(b)

  if (a > b) {
    a = a ^ b
    b = a ^ b
    a = a ^ b
  }

  let IsBooked = false
  let newTime = times.map((item, index) => {
    if (a > index) {
      return item
    } else if (b < index) {
      return item
    } else {
      if (item.pick == true) IsBooked = true
      return Object.assign({}, item, {
        Type: Type
      })
    }
  })
  //如果时间冲突了，则返回假
  if (IsBooked) {
    return false
  } else {
    return newTime
  }
}

const timeMaker = (t, half) => ({
  time: t + ':' + half,
  pick: false,
  Type: ''
})

function setTime(that, t1, t2, Type = '') {
  let newTime = timePick(that.data.time, t1, t2, Type)
  if (!newTime) {
    wx.showToast({
      title: '教练这个时间段已经被选，请选别的时间'
    })
  } else {
    that.setData({ time: newTime })
  }
  return newTime
}

function makeFresh() {
  let time = []
  let pickerAry = [
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30'
  ]
  for (var i = 14; i < 43; i++) {
    let t = parseInt(i / 2)
    if (i % 2 == 0) {
      time.push(timeMaker(t, '00'))
    } else {
      time.push(timeMaker(t, '30'))
    }
  }
  return [time, pickerAry]
}

module.exports.timePick = timePick
module.exports.timeMaker = timeMaker
module.exports.setTime = setTime
module.exports.makeFresh = makeFresh
