const form = document.querySelector('.task');
const btn = document.querySelector('#form__btn');
const input = document.querySelector('#form__input');
const list = document.querySelector('#list');

btn.addEventListener('click', (e) => {
	e.preventDefault();
	let inputValue = input.value;
	if (inputValue.trim() === '') {
		return alert('Введите задачу');
	}
	if (list.firstElementChild.id === 'start') {
		list.firstElementChild.remove();
	}
	list.classList.remove('list__start');
	showPush('alert-warning', 'Задача добавлена!');

	let li = document.createElement('li');
	let span = document.createElement('span');
	span.innerHTML = inputValue;
	li.appendChild(span);
	list.appendChild(li);

	let wrap = document.createElement('div');
	li.appendChild(wrap);

	let done = document.createElement('button');
	done.innerHTML = 'Done';
	done.setAttribute('data-action', 'done');
	done.setAttribute('id', 'btn_done');
	done.classList.add('list__done_btn');
	wrap.appendChild(done);

	let del = document.createElement('button');
	del.innerHTML = 'Delete';
	del.setAttribute('data-action', 'delete');
	del.classList.add('list__del_btn');
	wrap.appendChild(del);

	input.value = '';
});

function showPush(className, text) {
	let div = document.createElement('div');
	div.innerHTML = text;
	div.classList.add('alert');
	div.classList.add(className);
	document.querySelector('.container').prepend(div);

	let divId = setInterval(() => {
		div.remove();
		clearInterval(divId);
	}, 1000);
}

list.addEventListener('click', (e) => {
	if (e.target.dataset.action === 'delete') {
        showPush('alert-danger', 'Задача удалена!');
		let parent = e.target.closest('li');
		parent.remove();

		let listLength = document.querySelectorAll('#list li').length;

		if (listLength === 0) {
			let liStart = document.createElement('li');
			liStart.innerHTML = 'List of tasks is empty';
			liStart.setAttribute('id', 'start');
			list.classList.add('list__start');
			list.appendChild(liStart);
		}
	}

	if (e.target.dataset.action === 'done') {
        showPush('alert-success', 'Задача выполнена!');
		let span = e.target.closest('li').firstElementChild;
		span.classList.add('list__done');

		let parent = e.target.closest('li');
		list.append(parent);

		let btn = parent.querySelector('#btn_done');
		btn.remove();
	}
});
