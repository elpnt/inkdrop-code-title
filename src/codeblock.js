import React from "react";

export default function createTitledCodeBlock(OrigCode) {
  const Code = (props) => {
    // e.g.) className: ["language-javascript position"]
    const { className } = props;
    let splitted = [];
    let position = "";
    if (className) {
      splitted = className.split(" ");
      position = splitted[0];
    }

    return splitted.length ? (
      <div className={position}>
        <OrigCode {...props}>{props.children}</OrigCode>
      </div>
    ) : (
      <OrigCode {...props}>{props.children}</OrigCode>
    );
  };

  return Code;
}
