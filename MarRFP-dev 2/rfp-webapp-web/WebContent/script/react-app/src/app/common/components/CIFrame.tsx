import React from "react";

const validateUrlExp = new RegExp(/^.*$/);
const validateUrl = (url) => {
  if (url != "" && url != null) {
    if (url.match(validateUrlExp)) {
      return url;
    } else {
      return "";
    }
  }
};

function CIFrame(Props) {
  return (
    <div>
      <iframe
        src={validateUrl(Props.src)}
        width={Props.width}
        height={Props.height}
        onLoad={Props.onload}
        style={{
          height:
            (Props.componentName === "requestReport" ||
              Props.componentName === "viewReort") &&
            Props.height,
          border:
            (Props.componentName === "viewReort" ||
              Props.componentName === "requestEdie" ||
              Props.componentName === "viewEdie") &&
            "none",
        }}
      ></iframe>
      {Props.hiddenSrc && (
        <iframe
          hidden
          src={Props.hiddenSrc}
          width={Props.width}
          height={Props.height}
          onLoad={Props.onload}
        ></iframe>
      )}
    </div>
  );
}

export default CIFrame;
