import React from "react";

const Icon = props => {
  return (
    <div>
      <img src={require(`../images/icons/${props.icon}.png`)} alt="icon" />
    </div>
  );
};
export default Icon;
