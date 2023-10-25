import React from "react";
import Highlighter from "react-highlight-words";

const AccordionItem = ({
  search,
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
}) => (
  <div className="faq__question">
    <dt>
      <button
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        data-qa="faq__question-button"
        className={`faq__question-button ${fontWeightBold}`}
        onClick={onClick}
      >
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[search]}
          autoEscape={true}
          textToHighlight={item.question}
        />
      </button>
    </dt>
    <dd>
      <p
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`faq__desc ${showDescription}`}
      >
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[search]}
          autoEscape={true}
          textToHighlight={item.answer}
        />
      </p>
    </dd>
  </div>
);

export default AccordionItem;
