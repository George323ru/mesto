export default class UserInfo {
  constructor(
    data
  ) {
    this._selectorName = data.name;
    this._selectorJob = data.job;
    this._ownerId = data.id;
  }

  // Возвращаем объект с данными пользователя
  getUserInfo() {
    return {
      name: this._selectorName,
      job: this._selectorJob,
      id: this._ownerId
    };
  }

  // Принимаем новые данные пользователя и добавляем их на страницу
  setUserInfo(
    name,
    job,
    id
  ) {
    this._selectorName.textContent = name;
    this._selectorJob.textContent = job;
    this._ownerId = id;
  }
}
