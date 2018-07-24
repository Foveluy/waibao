// const host = 'http://127.0.0.1:7001/api'
const host = 'https://zh.9uhxir.top/django/zongheng'

var URL = {
  LOGIN: `${host}/login/`,
  COURSE: `${host}/course/`,
  TRAINER: 'https://zh.9uhxir.top/django/zongheng/trainer/?name=',
  COURSE_MODEL: 'https://zh.9uhxir.top/django/zongheng/courseModel/',
  COURSE_RECORD: 'https://zh.9uhxir.top/django/zongheng/courseRecord/?ticket=',
  COMMIT: 'https://zh.9uhxir.top/django/zongheng/commit/?trainer=',
  SCAN: 'https://zh.9uhxir.top/django/zongheng/qrcode/',
  USER: 'https://zh.9uhxir.top/django/zongheng/user/',
  bodyData: 'https://zh.9uhxir.top/django/zongheng/bodyData/',
  PERSON: 'https://zh.9uhxir.top/django/zongheng/personCourse/'
}

var TYPE = {
  CODE: 'code',
  BOOK_COURSE: 'book'
}


module.exports.URL = URL
module.exports.TYPE = TYPE
module.exports.host = 'http://127.0.0.1:3000'
