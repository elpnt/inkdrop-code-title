import React from "react";

export default function createTitledCodeBlock(OrigCode) {
  const Code = (props) => {
    const { className } = props;
    const hasTitle = className && className.split(" ")[0] === "with-title";

    return hasTitle ? (
      <div className="with-title-block">
        <OrigCode {...props}>{props.children}</OrigCode>
      </div>
    ) : (
      <OrigCode {...props}>{props.children}</OrigCode>
    );
  };

  return Code;
}
