class ChatUI {
  constructor($list) {
    this.list = $list;
  }

  activeBtnRoom($btns, id) {
    Array.from($btns).map($btn => {
      if($btn.getAttribute('id') === id) {
        $btn.classList.add('active');
      } else {
        $btn.classList.remove('active');
      }
    });
  }

  render(data) {
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );

    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;

    this.list.innerHTML += html;
  }

  clear() {
    this.list.innerHTML = '';
  }
}