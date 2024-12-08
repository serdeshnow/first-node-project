// console.log('Hello from client app.js!');

document.addEventListener("click", event => {
	if (event.target.dataset.type === "remove") {
		const id = event.target.dataset.id;
		console.log('clicked:', id);
		remove(id).then(() => {
			// event.target.parentNode.remove(); // issues may appear
			event.target.closest('li').remove();
		})
	}
});

document.addEventListener("click", event => {
	if (event.target.dataset.type === "edit") {
		const id = event.target.dataset.id;
		const noteTitle = event.target.closest('li').children[0]
		console.log('clicked:', noteTitle);
		
		const updatedTitle = prompt(`Редактирование заметки с ID: ${id}`, noteTitle.textContent);

		edit(id, updatedTitle).then(() => {
			noteTitle.innerHTML = updatedTitle;
		})
	}
});

async function remove(id) {
	await fetch(`/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	})
}

async function edit(id, title) {
	await fetch(`/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			id,
			title
		})
	})
}