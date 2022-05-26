import React from "react";
import "../../css/public.scss";

const Homepage = () => {
    return (
        <div id="home-view">
            <h1>Welcome to LangReader!</h1>
            <hr/>
            <p>This is a website for studying languages through reading. The main idea is that
                you add texts you actually want to read and understand, and by selecting which words you
                know, we track your progress in your language learning.</p>
            <p>You can select words you don't know, and the app will keep track of them for you, so you
                can go back to them later.</p>
            <p>You can create your own texts either by copying it from the original source to the
                prepared text area, or by copying and pasting the URL address of an article. A special
                algorithm will try to save the main text from the provided URL. This might not be 100%
                successful, but based on my testing, it seems fairly accurate. If the text is too long,
                it will be split into manageable chunks, in order for the webpage to stay responsive.</p>
            <p>I wish you a pleasant learning experience with this website.</p>
        </div>
    );
};

export default Homepage;
