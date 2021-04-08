export default class UserInfo {
  constructor(
    data
  ) {
    this._selectorName = data.name;
    this._selectorJob = data.job;
  }

  // Возвращаем объект с данными пользователя
  getUserInfo() {
    return {
      name: this._selectorName,
      job: this._selectorJob
    };
  }

  // Принимаем новые данные пользователя и добавляем их на страницу
  setUserInfo(
    name,
    job
  ) {
    this._selectorName.textContent = name;
    this._selectorJob.textContent = job;
  }
}
