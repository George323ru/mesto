// Находим контейнер с попапом
const popup = document.querySelector('.popup');

// Находим кнопки, при нажатии на которые попап будет открываться и закрываться
const popupOpenButton = document.querySelector('#profileEditButton');
const popupCloseButton = popup.querySelector('.popup__close-button');

// Находим поля, куда будут подставлены новые значения из полей формы
let userName = document.querySelector('#profileUserName');
let userJob = document.querySelector('#profilUserSpecialization');

// Находим форму в DOM
let formElement = popup.querySelector('#popupUserProfileForm');
// Находим поля формы в DOM
let nameInput = popup.querySelector('#popupUserProfileInputTypeName');
let jobInput = popup.querySelector('#popupUserProfileInputTypeJob');


// Обработчик открытия "попапа"
const handlePopupOpen = function (element) {
  // Открываем "попап" добавляя к нему модификатор ".popup_open" со свойством display:flex
  element.classList.add('popup_open');
}

// Обработчик закрытия "попапа"
const handlePopupClose = function (element) {
  element.classList.remove('popup_open');
}

const handlePopupProfileOpen = function () {
  handlePopupOpen(popup);

  // Добавляем в поля формы текст из профиля на странице
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Меняем содержимое в профиле на новое содержимое из полей формы
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  // Прячем "попап" удаляя у него модификатор ".popup_open" со свойством display:flex
  handlePopupClose(popup);
}

// События, которые будут происходить при нажатии на кнопки
popupOpenButton.addEventListener('click', handlePopupProfileOpen);
popupCloseButton.addEventListener('click', () => handlePopupClose(popup));
formElement.addEventListener('submit', formSubmitHandler);

// Шесть карточек «из коробки», которые сразу добавляются на главную страницу
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Тюмень',
  link: 'https://sdelanounas.ru/i/a/w/1/f_aW1nLmdlbGlvcGhvdG8uY29tL3Rtbi81NV90dW1lbi5qcGc_X19pZD0xMTM2MjM=.jpeg'
},
{
  name: 'Сургут',
  link: 'https://barcaffe.ru/wp-content/uploads/2020/07/28_surgut2020.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://im0-tub-ru.yandex.net/i?id=ba9010e38898e7d960c5374cc0f0d746-l&n=13'
}
];

// Находим кнопку открытия попапа для добавления новго места
const addButtonEl = document.querySelector('#profileAddButton')
// Находим попап вместе с формой для добавления нового места
const popupAddMesto = document.querySelector('#popupNewMesto')
const formAddEl = popupAddMesto.querySelector('#popupAddForm')
// Находим поля ввода названия и ссылки новой карточки
const popupImgInputName = popupAddMesto.querySelector('#popupMestoName')
const popupImgInputLink = popupAddMesto.querySelector('#popupMestoLink')
// Находим кнопку закртытия попапа
const popupAddCloseBtn = popupAddMesto.querySelector('#closeButtonAdd')

// Находим ту секцию, куда будем добавлять карточки из массива и новые пользовательские карточки
const listContainerEl = document.querySelector('.elements__element-list')
// Находим шаблон, по которому будем создавать новые карточки
const templateEl = document.querySelector('.template')

// Находим попап, в котором будет появлятся картинка в увеличенном виде
const popupImg = document.querySelector('#popupImgZoom')
// Находим кнопку закрытия попапа с увеличенной картинкой
const popupImgCloseBtn = popupImg.querySelector('#popupImgCloseBtn')
// Находим картинку и заголовок карточки, которая будет увеличена
const popupImgPicEl = popupImg.querySelector('#popupImgPic')
const popupImgNameEl = popupImg.querySelector('#popupImgName')

// Обработчик открытия "попапа" с увеличенной картинкой
const handlePopupImgOpen = function (element) {
  element.classList.add('popupImg_open');
}

// Обработчик закрытия "попапа" с увеличенной картинкой
const handlePopupImgClose = function (element) {
  element.classList.remove('popupImg_open');
}


// Отрисовываем карточки из массива initialCards и новые карточки,
// которые будут добавленны на страницу
function render() {
  // Преобразуем массив initialCards в новый массив renderHtml,
  // добавляем к каждому элементу разметку из шаблона templateEl
  const renderHtml = initialCards.map(getItem)

  // Вставляем преобразовавшийся массив в разметку
  listContainerEl.append(...renderHtml)
}

// Вызываем функцию отрисовки карточек
render();

// Втавляем данные из массива initialCards в шаблон templateEl
function getItem(item) {
  // Клонируем все элементы шаблона в константу
  const newItem = templateEl.content.cloneNode(true);
  // Ищем header и img в элементах шаблона
  const titleEl = newItem.querySelector('.element__title')
  const imgEl = newItem.querySelector('.element__image')
  // Добавляем из массива название заголовка и ссылку в склонированный шаблон
  titleEl.textContent = item.name;
  imgEl.src = item.link;
  imgEl.alt = item.name;

  // Открываем попап с увеличенной картинкой при нажатии на изображение карточки
  imgEl.addEventListener('click', function () {
    handlePopupImgOpen(popupImg);
    popupImgPicEl.src = item.link;
    popupImgNameEl.textContent = item.name;
  })

  // Оживляем кнопку удаления
  const removeBtn = newItem.querySelector('#buttonDelete')
  removeBtn.addEventListener('click', handleDelete);
  // Оживляем у каждой карточки кнопку лайк
  const likeButtonEl = newItem.querySelector('#likeButton')
  likeButtonEl.addEventListener('click', handleBtnLike);

  // Возращаем созданый шаблон
  return newItem;
}

addButtonEl.addEventListener('click', () => handlePopupImgOpen(popupAddMesto))

// Форма добавления новой карточки на станицу,
// которая появляется вместе с popup при нажатии на кнопку добавить(addButtonEl)
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Сохраняем значения, полученные из input'ов формы
  const inputText = popupImgInputName.value;
  const inputSrc = popupImgInputLink.value;

  // Значение, полученное из input мы добавляем в поля name и link объектов массива
  // создаваемого с помощью функции getItem() элемента
  const listItem = getItem({
    name: inputText,
    link: inputSrc
  });

  // Добавляем создвнные по шаблону элементы в начало разметки блока elements__element-list
  // с помощью метода prepend()
  listContainerEl.prepend(listItem)

  // Очищаем input формы
  popupImgInputName.value = '';
  popupImgInputLink.value = '';

  // Закрываем popup
  handlePopupImgClose(popupAddMesto)
}

// Кнопка закрытия формы
formAddEl.addEventListener('submit', formAddSubmitHandler)

// Удаление выбраной карточки
function handleDelete(event) {
  const targetDeleteEl = event.target; // Выбираем кнопку через специальное свойство target
  // Выбираем родительский элемент, в котором будет удаляться дочерний элемент
  const targetItem = targetDeleteEl.closest('.element');
  targetItem.remove() // Функция удаления элемента
}

// Код для кнопки лайк
function handleBtnLike(event) {
  // Получаем кнопку, как элемент цель
  const targetBtnLikeEl = event.target;
  // Добавляем переключатель класса
  const targetItem = targetBtnLikeEl.classList.toggle('element__likeButton_active');
}

// Кнопка закрытия попапа добавления нового места
popupAddCloseBtn.addEventListener('click', () => handlePopupImgClose(popupAddMesto))

// Кнопка закрытия попапа с картинкой
popupImgCloseBtn.addEventListener('click', () => handlePopupImgClose(popupImg))
