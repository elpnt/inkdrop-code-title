import React from "react";

export default function createTitledPreBlock(OrigPre) {
  const Pre = (props) => {
    const codeClassName = props.className;
    const hasTitle =
      codeClassName && codeClassName.split(" ")[0] === "with-title";
    const OrigNode = (props) => {
      return OrigPre ? <OrigPre {...props}/> : <pre {...props}/>;
    };
    return hasTitle ? (
      <div className="with-title-block">
        <OrigNode {...props}/>
      </div>
    ) : (
      <OrigNode {...props}/>
    );
  };

  return Pre;
}
