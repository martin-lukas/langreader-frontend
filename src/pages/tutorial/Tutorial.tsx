import React from "react";
import "../../css/public.scss";

const Tutorial: React.FC = () => {
    return (
        <div id="tutorial-view">
            <h1>Tutorial</h1>
            <hr/>
            <p>This web application currently consists of several sections.</p>

            <h2>Languages</h2>
            <p>The language section allows you to manage languages you're interested in, and switch
                between them as you go. The currently selected language is then visible in the navigation
                menu.</p>
            <p>You can also remove the languages. But be careful. Removing the language results in
                removing
                all the texts and words added in that language (that is, added while the language was
                selected).</p>
            <p>After choosing your first language, a new section will appear in the menu - your
                library.</p>

            <h2>Library</h2>
            <h3>Adding texts</h3>
            <p>The library contains all your texts in the currently selected language.
                It allows searching through them according to their title.</p>
            <p>There is a plus button on the right of the search bar, that allows you to add more texts,
                either by pasting the text directly into the text area, or by providing a URL address,
                from which the app will attempt to extract the main text into a new library item.</p>
            <p>If the text is too long, it will be split into several parts, which will be labeled
                accordingly. This keeps the loading time of each text acceptable.</p>
            <p>Each text is shown by its title, from the newest all the way to the oldest one. There are
                buttons available on the right side, which allow you to edit the text
                (<i>to be implemented</i>), or remove it.</p>
            <h3>Reading</h3>
            <p>After adding your first text, you can start learning by clicking on it. The text will
                open, and all the individual words will be highlighted according to their current status.
                Every word can be in one of the following states (represented by these colors):</p>
            <ul>
                <li><span className="UNKNOWN">unknown</span> - a word not yet encountered</li>
                <li><span className="KNOWN">known</span> - a word marked as already known</li>
                <li><span className="STUDIED">studied</span> - a word marked for further study</li>
                <li><span className="IGNORED">ignored</span> - a word marked as ignored
                    (for example, words that are not part of the language, like names, brands, locations etc.)
                </li>
            </ul>
            <p>A known word and an ignored word will look exactly the same. That is intentional. After
                marking them as such, these shouldn't distract you anymore from the more significant
                words.</p>
            <h3>Controls</h3>
            <p>After the loading is finished, you can select the first word by a mouse click. Selecting
                surrounding words after that can be accomplished with <span className="key arrow-key">←</span>
                and
                <span className="key arrow-key">→</span> arrow keys.</p>
            <p>You can mark words by keys:</p>
            <ul>
                <li><span className="key a-key">a</span> - marks a word as <span className="KNOWN">known</span></li>
                <li><span className="key s-key">s</span> - marks a word as <span className="STUDIED">studied</span></li>
                <li><span className="key d-key">d</span> - marks a word as <span className="IGNORED">ignored</span></li>
                <li><span className="key r-key">r</span> - resets the state of a word (to <span className="UNKNOWN">unknown</span>)</li>
            </ul>
            <p>After each key press, every occurrence of the marked word in the text will change its
                state,
                and the focus will automatically move onto the next unknown word.</p>
            <p>Note that your learning progress isn't lost even if you remove the texts after you finish
                reading them. That way, you can keep in your library only those texts, that are still
                relevant to
                your learning.</p>
            <h2>Account Page</h2>
            <p>Here you will find statistics about marked words in your studied languages. This page
                will be expanded in the future to provide even more statistics and account information.</p>
        </div>
    );
};

export default Tutorial;
