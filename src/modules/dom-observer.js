class DOMObserver {
    constructor() {
        this.observer = null;
        this.callbacks = [];
        this.logger = window.ReplyAssistantLogger;
        this.config = window.ReplyAssistantConfig;
    }

    start() {
        this.logger.log("starting observer");
        const toolbars = document.querySelectorAll(this.config.selectors.toolbar);
        toolbars.forEach(toolbar => this.notifyCallbacks(toolbar));

        this.observer = new MutationObserver(this.handleMutations.bind(this));
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    on(eventName, callback) {
        if (eventName === 'replyEditorAdded') {
            this.callbacks.push(callback);
        }
    }

    //for new changes in the page
    handleMutations(mutations) {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') { //check for new elements
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) { //check for nre HTML elements
                        this.checkForReplyEditor(node);
                    }
                });
            }
        }
    }

    checkForReplyEditor(node) {
        const sel = this.config.selectors;
        let toolbar = null;

        //if node is toolbar
        if (node.matches && node.matches(sel.toolbar)) {
            toolbar = node;
        } else if (node.querySelector) {
            toolbar = node.querySelector(sel.toolbar);
        }

        if (toolbar) {
            if (this.isReplyContext(toolbar)) {
                this.notifyCallbacks(toolbar);
            }
        }
    }

    isReplyContext(toolbar) {
        if (!toolbar) return false;

        let parent = toolbar.parentElement;

        //finding context
        for (let i = 0; i < this.config.settings.domTraversalDepth; i++) {
            if (!parent) break;

            //"post your reply"
            const text = parent.innerText || "";
            if (this.config.textPatterns.replyIndicators.some(p => text.includes(p))) {
                return true;
            }

            parent = parent.parentElement;
        }
        return false;
    }

    notifyCallbacks(element) {
        this.callbacks.forEach(cb => cb(element));
    }
}

window.ReplyAssistantObserver = DOMObserver;
