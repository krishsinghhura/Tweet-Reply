class TweetExtractor {
    constructor() {
        this.logger = window.ReplyAssistantLogger;
        this.config = window.ReplyAssistantConfig;
    }

    extract(buttonInfo) {
        const button = buttonInfo;
        const dialog = button.closest(this.config.selectors.dialog);//pop up modal for replies
        const selector = this.config.selectors.tweetText;

        if (dialog) {
            const tweets = Array.from(dialog.querySelectorAll(selector));
            if (tweets.length > 0) {
                return this.cleanText(tweets[tweets.length - 1]);
            }
        }
        const tweets = document.querySelectorAll(selector);
        let targetTweet = null;

        //checks all the twweets and picks our tweet
        for (let i = tweets.length - 1; i >= 0; i--) {
            const tweet = tweets[i];
            if (button.compareDocumentPosition(tweet) & Node.DOCUMENT_POSITION_PRECEDING) {
                targetTweet = tweet;
                break;
            }
        }
        return targetTweet ? this.cleanText(targetTweet) : null;
    }

    cleanText(element) { //removes all the html and returns the text it also incldue emojis
        if (!element) return "";

        let text = "";
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'IMG') { //for imgs
                    text += node.alt;
                } else {
                    text += node.innerText;
                }
            }
        });

        return text.trim();
    }
}

window.ReplyAssistantExtractor = TweetExtractor;
