export default class UserInfo {
  constructor(data) {
    this._selectorName = data.name;
    this.selectorJob = data.job;
  }

  // Возвращаем объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  // Принимаем новые данные пользователя и добавляем их на страницу
  setUserInfo({
    name,
    job
  }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
