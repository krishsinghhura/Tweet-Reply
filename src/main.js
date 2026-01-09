(function () {
    const Logger = window.ReplyAssistantLogger;
    const Observer = window.ReplyAssistantObserver;
    const Injector = window.ReplyAssistantInjector;
    const Extractor = window.ReplyAssistantExtractor;
    const Config = window.ReplyAssistantConfig;

    if (!Logger || !Observer || !Injector || !Extractor || !Config) {
        console.error("importing modules got failed");
        return;
    }

    const logger = Logger;
    const observer = new Observer();
    const injector = new Injector();
    const extractor = new Extractor();
    const config = Config;

    logger.log("extension started...");

    observer.on('replyEditorAdded', (toolbar) => { //will recieve the event from observer
        injector.inject(toolbar, (buttonElement) => {
            handleButtonClick(buttonElement);
        });
    });

    observer.start();

    //text extraction
    function handleButtonClick(buttonElement) {
        logger.log("extension clicked");
        try {
            const text = extractor.extract(buttonElement);
            if (text) {
                logger.log("extracted text:", text);
                insertText(buttonElement, text);
            } else {
                logger.error("empty twwet");
            }
        } catch (err) {
            logger.error("error", err);
        }
    }

    //inserting
    function insertText(buttonElement, text) {
        const editorWrapper = findEditor(buttonElement);
        if (!editorWrapper) {
            logger.error("couldnt find editor wrapper");
            return;
        }

        let contentEditable = editorWrapper.querySelector(config.selectors.editable) || editorWrapper.querySelector(config.selectors.textbox);
        if (!contentEditable && editorWrapper.getAttribute('contenteditable')) { //finds the div which has contenteditable=true
            contentEditable = editorWrapper;
        }
        contentEditable.focus();

        try {
            const dataTransfer = new DataTransfer();//faking the clipboard
            dataTransfer.setData('text/plain', text);

            const pasteEvent = new ClipboardEvent('paste', {
                bubbles: true,
                cancelable: true,
                clipboardData: dataTransfer
            });

            contentEditable.dispatchEvent(pasteEvent);
            logger.log("reply inserted");

        } catch (e) {
            logger.error("pasting failed", e);
        }
    }

    function findEditor(startElement) { //finds the input reply box
        let current = startElement;
        for (let i = 0; i < config.settings.domTraversalDepth + 1; i++) {
            if (!current) break;

            const editor = current.querySelector(config.selectors.editorWrapper);
            if (editor) return editor;

            current = current.parentElement;
        }
        return null;
    }

})();
