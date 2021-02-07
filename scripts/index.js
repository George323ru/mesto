// Находим контейнер у которого будем менять значение display
const popup = document.querySelector('.popup');

// Находим кнопки, при нажатии на которые "попап" будет открываться и закрываться
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

// Находим поля, куда будут подставлены новые значения из полей формы
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-specialization');

// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');


// Обработчик открытия "попапа"
const popupOpen = function () {
  // Открываем "попап" добавляя к нему модификатор ".popup_open" со свойством display:flex
  popup.classList.add('popup_open');

  // Добавляем в поля формы текст из профиля на странице
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Обработчик закрытия "попапа" без сохранения введеных данных
const popupClose = function () {
  // Прячем "попап" удаляя у него модификатор ".popup_open" со свойством display:flex
  popup.classList.remove('popup_open');
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Меняем содержимое в профиле на новое содержимое из полей формы
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  // Прячем "попап" удаляя у него модификатор ".popup_open" со свойством display:flex
  popupClose();
}

// События, которые будут происходить при нажатии на кнопки
popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

// Шесть карточек «из коробки», которые сразу добавляются на главную страницку при открытии сайта
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
    link: 'https://rebcentr72.ru/wp-content/uploads/2020/09/tumen.jpg'
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

// Находим попап вместе с формой для добавления нового места
const popapAdd = document.querySelector('#popupNewMesto')
const formAddEl = document.querySelector('#popapAddForm')
// Находим ту часть разметки, куда будем добавлять карточки из массива и новые карточки
const listContainerEl = document.querySelector('.elements__element-list')
// Находим шаблон, по которому будем создавать новые карточки
const templateEl = document.querySelector('.template')
//Находим кнопку добавления новой карточки
const addButtonEl = document.querySelector('.profile__add-button')
// Находим поля ввода названия и ссылки на картинку для новых карточек
const inputNameLoc = document.querySelector('#popapMestoName')
const inputLinkLoc = document.querySelector('#popapMestoLink')

// В этой функции мы отрисовываем все карточки из массива initialCards и новых карточек на страницу
function render() {
  const renderHtml = initialCards
    .map(getItem) // Создаем новый массив из массива initialCards и добавляем к каждому элементу разметку

  listContainerEl.append(...renderHtml) // Вставляем новую разметку в HTML

}

function getItem(item) {
  // Клонируем все элементы шаблона в константу
  const newItem = templateEl.content.cloneNode(true);
  // Ищем header и img в элементе шаблона
  const headerEl = newItem.querySelector('.element__title')
  const imgEl = newItem.querySelector('.element__image')
  // Добавляем название заголовка и ссылку из массива
  headerEl.textContent = item.name;
  imgEl.src = item.link;
  imgEl.alt = item.name;

  // Получаем ссылку на кнопку удаления
  const removeBtn = newItem.querySelector('#buttonDelete')
  removeBtn.addEventListener('click', handleDelete);

  const likeButtonEl = newItem.querySelector('#likeButton')
  likeButtonEl.addEventListener('click', handleBtnLike);

  return newItem;
}

// Код для открытия окошка добавления нового места
function handleAdd() {
  popapAdd.classList.add('popup_open');
}

function formAddSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Сохраняем значения, полученные из input в константы
  const inputText = inputNameLoc.value;
  const inputSrc = inputLinkLoc.value;

  // Значение, полученное из input мы добавляем в поля name и link объектов массива
  // создаваемого с помощью функции getItem() элемента
  const listItem = getItem({
    name: inputText,
    link: inputSrc
  });

  // Добавляем создвнные по шаблону элементы в начало разметки блока elements__element-list
  // с помощью метода prepend()
  listContainerEl.prepend(listItem)

  // Очищаем input
  inputNameLoc.value = '';
  inputLinkLoc.value = '';

  // Закрываем окно popup удаляя класс
  popapAdd.classList.remove('popup_open');
}

function handleDelete(event) {
  const targetEl = event.target; // Это кнопка
  // Выбираем родительский элемент, в котором будет удаляться дочерний элемент
  const targetItem = targetEl.closest('.element');
  targetItem.remove() // Функция удаления элемента
}

// Вызываем функцию для вывода уже имеющихся на сервере карточек
render();

// События, которые будут происходить при нажатии на кнопки
addButtonEl.addEventListener('click', handleAdd)
formAddEl.addEventListener('submit', formAddSubmitHandler)

// const likeButtonEl = document.querySelector('#likeButton')

// Код для кнопки лайк
function handleBtnLike (event) {
  // Получаем кнопку, как елемент цель
  const targetEl = event.target;
  // Добавляем новый класс кнопке
  const targetItem = targetEl.classList.toggle('element__likeButton_active');

}


// // Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

//     // Получите значение полей jobInput и nameInput из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);
