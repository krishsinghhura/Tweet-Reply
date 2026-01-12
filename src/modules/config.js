const Config = {
    selectors: {
        toolbar: '[data-testid="toolBar"]',//image,gif toolbar in the reply box
        editorWrapper: '[data-testid="tweetTextarea_0"]', //replying input box
        tweetText: '[data-testid="tweetText"]', //replying tweet text
        replyButton: '[data-testid="tweetButton"], [data-testid="tweetButtonInline"]',//reply buttons in both(normal and modal)
        dialog: '[role="dialog"]',//whole reply modal
        editable: '[contenteditable]', //contenteditable=true div for input in Html
        textbox: '[role="textbox"]'//reply input box
    },
    textPatterns: {
        replyIndicators: ["Post your reply", "Replying to"]
    },
    settings: {
        domTraversalDepth: 6
    }
};

window.ReplyAssistantConfig = Config;
