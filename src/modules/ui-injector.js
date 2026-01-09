class UIInjector {
    constructor() {
        this.logger = window.ReplyAssistantLogger;
        this.config = window.ReplyAssistantConfig;
        this.buttonClass = 'reply-assistant-btn';
    }

    inject(toolbar, onClickCallback) {
        if (!toolbar) return;

        const sel = this.config.selectors;
        const replyButton = toolbar.querySelector(sel.replyButton);

        if (!replyButton) {
            return;
        }

        const targetContainer = replyButton.parentElement;
        if (!targetContainer) return;

        if (targetContainer.querySelector(`.${this.buttonClass}`)) {
            return;
        }

        this.logger.log("extension UI injected");

        if (window.getComputedStyle(targetContainer).position === 'static') {
            targetContainer.style.position = 'relative';
        }

        const button = document.createElement('button');
        button.className = this.buttonClass;
        button.type = 'button';

        const iconUrl = chrome.runtime.getURL('icons/icon16.png');
        button.innerHTML = `<img src="${iconUrl}" alt="tweet reply" style="width: 18px; height: 18px; display: block;">`;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClickCallback(button);
        });

        targetContainer.appendChild(button);
    }
}

window.ReplyAssistantInjector = UIInjector;
