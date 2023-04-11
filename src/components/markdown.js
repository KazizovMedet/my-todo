import React, {useState} from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
// import "katex/dist/katex.min.css";
import markdownItKatex from "markdown-it-katex";
// import {useField} from "formik";
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';
import 'react-katex/dist/react-katex.js';

const mdParser = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            console.log(hljs.getLanguage(lang));
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    },
}).use(markdownItKatex);

const Markdown = ({name}) => {
    const [markdownField,markdownHelper] = useState('');

    const handleEditorChange = ({ html, text }) => {
        markdownHelper(text);
    };


    return (
        <div data-color-mode="light">
            <MdEditor
                value={markdownField}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                style={{ height: '300px' }}
                config={{
                    katex: {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '\\[', right: '\\]', display: true },
                            { left: '$', right: '$', display: false },
                            { left: '\\(', right: '\\)', display: false },
                        ],
                    },
                }}
            />
        </div>
    );
};

export default Markdown;
