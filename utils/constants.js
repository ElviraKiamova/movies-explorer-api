const errorMessages = {
  createMovie: 'Переданы некорректные данные при создании фильма',
  createUser: 'Переданы некорректные данные при создании пользователя',
  deleteMovie: 'Переданы некорректные данные при попытке удалить фильм',
  findUser: 'Переданы некорректные данные при поиске пользователя',
  movieNotFound: 'Фильм не найден',
  movieDeleted: 'Фильм удален',
  deleteSomeone: 'Нельзя удалять чужой фильм',
  userNotFound: 'Пользователь не найден',
  createUserUps: 'Пользователь существует',
  updateUser: 'Пользователь  с такими Email уже зарегистрирован',
  authMessage: 'Необходима авторизация',
  errorHandler: 'На сервере произошла ошибка',
  validate: 'Ссылка не валидна',
  imageMessage: 'Не соответствует формату URL-адреса картинки',
  trailerLinkMessage: 'Не соответствует формату URL-адреса картинки трейлера',
  thumbnailMessage: 'Не соответствует формату URL-адреса картинки эскиза',
  incorrectMailFormat: 'Неправильный формат почты',
  incorrectEmailPassword: 'Указан некорректный Email или пароль',
  nonExistentAddress: 'Обращение по несуществующему адресу',
  serverWillCrash: 'Сервер сейчас упадёт',
};

module.exports = { errorMessages };
