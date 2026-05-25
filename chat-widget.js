(function () {
  const existing = document.querySelector('.floating-widget');
  if (existing) existing.remove();

  const quickQuestions = [
    {
      label: 'Ongoing project details',
      reply: 'Sure. Please share your name and phone number, and our team will send details for current ongoing projects.'
    },
    {
      label: 'Upcoming launches',
      reply: 'Great. We can notify you about upcoming launches. Please share your name, phone number, and preferred location.'
    },
    {
      label: 'Book a site visit',
      reply: 'Happy to help. Please share your name, phone number, preferred project, and a suitable visit time.'
    },
    {
      label: 'Channel partner enquiry',
      reply: 'Thanks for your interest. Please share your name, company name, and phone number so our partner team can connect.'
    },
    {
      label: 'Marketing support',
      reply: 'Absolutely. Please share your project type, location, and phone number so Spacez can recommend the right marketing plan.'
    }
  ];

  const style = document.createElement('style');
  style.textContent = `
    .spacez-chat {
      position: fixed;
      right: clamp(14px, 3vw, 28px);
      bottom: clamp(14px, 3vw, 24px);
      z-index: 1200;
      font-family: var(--font-main, "Manrope", system-ui, sans-serif);
    }

    .spacez-chat-panel {
      position: absolute;
      right: 0;
      bottom: 66px;
      width: min(380px, calc(100vw - 28px));
      height: min(560px, calc(100vh - 102px));
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #ffffff;
      border: 1px solid rgba(21, 54, 47, 0.08);
      border-radius: 10px;
      box-shadow: 0 24px 60px rgba(21, 54, 47, 0.18);
      opacity: 0;
      transform: translateY(14px) scale(0.98);
      pointer-events: none;
      transition: opacity 220ms ease, transform 220ms ease;
    }

    .spacez-chat.is-open .spacez-chat-panel {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .spacez-chat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(21, 54, 47, 0.08);
    }

    .spacez-chat-title {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #27413f;
      font-size: 0.92rem;
      font-weight: 800;
    }

    .spacez-chat-title img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    .spacez-chat-tools {
      display: inline-flex;
      gap: 10px;
      color: #626b68;
    }

    .spacez-chat-icon-btn {
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0;
      transition: color 160ms ease, transform 160ms ease;
    }

    .spacez-chat-icon-btn:hover {
      color: var(--brand, #245f4d);
      transform: scale(1.08);
    }

    .spacez-chat-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 18px 16px;
      overflow-y: auto;
    }

    .spacez-chat-row {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr);
      gap: 10px;
      align-items: start;
    }

    .spacez-chat-avatar {
      width: 22px;
      height: 22px;
      margin-top: 8px;
      object-fit: contain;
    }

    .spacez-chat-message,
    .spacez-chat-user-message {
      max-width: 292px;
      padding: 11px 15px;
      border-radius: 18px;
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .spacez-chat-message {
      background: #f5f6f5;
      color: #27413f;
    }

    .spacez-chat-message strong {
      font-weight: 800;
    }

    .spacez-chat-user-message {
      align-self: flex-end;
      color: #ffffff;
      background: var(--brand, #245f4d);
      border-bottom-right-radius: 6px;
    }

    .spacez-chat-questions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 4px 0 0 34px;
    }

    .spacez-chat-chip {
      display: inline-flex;
      padding: 8px 12px;
      border: 1px solid rgba(36, 95, 77, 0.14);
      border-radius: 999px;
      background: #ffffff;
      color: var(--brand, #245f4d);
      font: inherit;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      transition: background 160ms ease, color 160ms ease, transform 160ms ease;
    }

    .spacez-chat-chip:hover {
      background: var(--brand, #245f4d);
      color: #ffffff;
      transform: translateY(-1px);
    }

    .spacez-chat-time {
      margin-left: 34px;
      color: #9aadb4;
      font-size: 0.78rem;
    }

    .spacez-chat-input {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 42px;
      align-items: center;
      min-height: 58px;
      border-top: 1px solid #d8e0e2;
      background: #ffffff;
    }

    .spacez-chat-input input {
      width: 100%;
      border: 0;
      outline: 0;
      padding: 0 16px;
      color: #294543;
      font: inherit;
      font-size: 0.9rem;
    }

    .spacez-chat-input input::placeholder {
      color: #9fb2bb;
    }

    .spacez-chat-send {
      width: 42px;
      height: 42px;
      border: 0;
      background: transparent;
      color: #c8c8c8;
      cursor: pointer;
      transition: color 160ms ease, transform 160ms ease;
    }

    .spacez-chat-send:hover {
      color: var(--brand, #245f4d);
      transform: translateX(2px);
    }

    .spacez-chat-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    .spacez-whatsapp,
    .spacez-chat-launcher {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 12px 28px rgba(21, 54, 47, 0.16);
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .spacez-whatsapp:hover,
    .spacez-chat-launcher:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 34px rgba(21, 54, 47, 0.22);
    }

    .spacez-whatsapp {
      width: 52px;
      height: 52px;
      background: #07d969;
      color: #ffffff;
    }

    .spacez-chat-launcher {
      width: 52px;
      height: 52px;
      background: #ffffff;
    }

    .spacez-chat-launcher img {
      width: 34px;
      height: 34px;
      object-fit: contain;
    }

    .spacez-chat-status {
      position: absolute;
      right: -1px;
      bottom: 5px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #30c979;
      border: 2px solid #ffffff;
    }

    @media (max-width: 640px) {
      .spacez-chat {
        right: 12px;
        bottom: 12px;
      }

      .spacez-chat-panel {
        bottom: 62px;
        width: min(350px, calc(100vw - 24px));
        height: min(520px, calc(100dvh - 88px));
        max-height: calc(100dvh - 88px);
      }

      .spacez-whatsapp,
      .spacez-chat-launcher {
        width: 46px;
        height: 46px;
      }

      .spacez-chat-launcher img {
        width: 30px;
        height: 30px;
      }
    }

    @media (max-width: 380px) {
      .spacez-chat-actions {
        gap: 8px;
      }

      .spacez-chat-panel {
        right: -2px;
        width: calc(100vw - 20px);
      }

      .spacez-chat-body {
        padding: 14px 12px;
      }

      .spacez-chat-questions {
        margin-left: 0;
      }

      .spacez-chat-chip {
        width: 100%;
        justify-content: center;
      }

      .spacez-chat-message,
      .spacez-chat-user-message {
        max-width: 250px;
      }

      .spacez-whatsapp,
      .spacez-chat-launcher {
        width: 44px;
        height: 44px;
      }
    }
  `;
  document.head.appendChild(style);

  const widget = document.createElement('div');
  widget.className = 'spacez-chat';
  widget.innerHTML = `
    <section class="spacez-chat-panel" aria-label="Spacez enquiry chat">
      <div class="spacez-chat-top">
        <div class="spacez-chat-title">
          <img src="assets/spacez-logo-transparent.png" alt="">
          <span>Spacez Enquiry</span>
        </div>
        <div class="spacez-chat-tools">
          <button class="spacez-chat-icon-btn" type="button" data-chat-reset aria-label="Restart chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg>
          </button>
          <button class="spacez-chat-icon-btn" type="button" data-chat-close aria-label="Close chat">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
      </div>
      <div class="spacez-chat-body">
        <div class="spacez-chat-row">
          <img class="spacez-chat-avatar" src="assets/spacez-logo-transparent.png" alt="">
          <div class="spacez-chat-message">Welcome to <strong>Spacez!</strong> Please choose an enquiry option.</div>
        </div>
        <div class="spacez-chat-questions">
          ${quickQuestions.map((item, index) => `<button class="spacez-chat-chip" type="button" data-question="${index}">${item.label}</button>`).join('')}
        </div>
        <div class="spacez-chat-time">Online now</div>
      </div>
      <form class="spacez-chat-input">
        <input type="text" name="answer" placeholder="Type your name and phone number" autocomplete="off">
        <button class="spacez-chat-send" type="submit" aria-label="Send message">
          <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21.8 12 3.4 3.6v6.7l10.4 1.7-10.4 1.7v6.7Z"></path></svg>
        </button>
      </form>
    </section>
    <div class="spacez-chat-actions">
      <a class="spacez-whatsapp" href="https://wa.me/919686606807" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg width="29" height="29" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path fill="currentColor" d="M16.02 3.2c-6.98 0-12.65 5.58-12.65 12.46 0 2.33.66 4.51 1.8 6.37L3.3 28.8l6.98-1.78a12.8 12.8 0 0 0 5.74 1.36c6.98 0 12.65-5.58 12.65-12.46S23 3.2 16.02 3.2Zm0 22.95c-1.9 0-3.66-.5-5.2-1.38l-.5-.29-4.15 1.06 1.1-4.01-.33-.52a10.26 10.26 0 0 1-1.54-5.35c0-5.65 4.76-10.24 10.62-10.24s10.62 4.6 10.62 10.24c0 5.65-4.76 10.49-10.62 10.49Zm5.82-7.65c-.32-.16-1.9-.93-2.2-1.04-.29-.1-.5-.16-.72.16-.21.31-.82 1.04-1 1.25-.19.21-.37.23-.69.08-.32-.16-1.35-.49-2.57-1.55a9.5 9.5 0 0 1-1.78-2.18c-.19-.31-.02-.48.14-.64.14-.14.32-.37.48-.56.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.72-1.7-.98-2.33-.26-.61-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.39-.29.31-1.12 1.08-1.12 2.64s1.14 3.07 1.3 3.28c.16.21 2.25 3.39 5.45 4.75.76.33 1.36.52 1.82.67.76.24 1.46.2 2.01.12.61-.09 1.9-.77 2.17-1.51.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"></path></svg>
      </a>
      <button class="spacez-chat-launcher" type="button" aria-label="Open chat">
        <img src="assets/spacez-logo-transparent.png" alt="">
        <span class="spacez-chat-status" aria-hidden="true"></span>
      </button>
    </div>
  `;
  document.body.appendChild(widget);

  const launcher = widget.querySelector('.spacez-chat-launcher');
  const close = widget.querySelector('[data-chat-close]');
  const reset = widget.querySelector('[data-chat-reset]');
  const input = widget.querySelector('input');
  const form = widget.querySelector('form');
  const body = widget.querySelector('.spacez-chat-body');

  function openChat() {
    widget.classList.add('is-open');
    setTimeout(() => input.focus(), 180);
  }

  function appendBotMessage(text) {
    const row = document.createElement('div');
    row.className = 'spacez-chat-row';
    row.innerHTML = `
      <img class="spacez-chat-avatar" src="assets/spacez-logo-transparent.png" alt="">
      <div class="spacez-chat-message">${text}</div>
    `;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  function appendUserMessage(text) {
    const message = document.createElement('div');
    message.className = 'spacez-chat-user-message';
    message.textContent = text;
    body.appendChild(message);
    body.scrollTop = body.scrollHeight;
  }

  function resetChat() {
    body.innerHTML = `
      <div class="spacez-chat-row">
        <img class="spacez-chat-avatar" src="assets/spacez-logo-transparent.png" alt="">
        <div class="spacez-chat-message">Welcome to <strong>Spacez!</strong> Please choose an enquiry option.</div>
      </div>
      <div class="spacez-chat-questions">
        ${quickQuestions.map((item, index) => `<button class="spacez-chat-chip" type="button" data-question="${index}">${item.label}</button>`).join('')}
      </div>
      <div class="spacez-chat-time">Online now</div>
    `;
    input.value = '';
    input.placeholder = 'Type your name and phone number';
  }

  launcher.addEventListener('click', () => {
    widget.classList.toggle('is-open');
    if (widget.classList.contains('is-open')) setTimeout(() => input.focus(), 180);
  });

  close.addEventListener('click', () => widget.classList.remove('is-open'));
  reset.addEventListener('click', () => {
    resetChat();
    openChat();
  });

  body.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-question]');
    if (!chip) return;
    const item = quickQuestions[Number(chip.dataset.question)];
    if (!item) return;
    appendUserMessage(item.label);
    appendBotMessage(item.reply);
    input.placeholder = 'Enter your name and phone number';
    input.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendUserMessage(value);
    appendBotMessage('Thank you. Our Spacez team will connect with you shortly.');
    input.value = '';
    input.placeholder = 'Ask another enquiry question';
  });
}());
