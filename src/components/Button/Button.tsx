import React from "react";
import { MyButton } from "./Styles";

interface ButtonProps {
  item:  { title: string, type: string};
  switchType: (type: string)=>void;
}

const Button: React.FC<ButtonProps> = ({ item, switchType }) => {
  return (
      <MyButton
        onClick={() => {
          switchType(item.type);
        }}
      >
        {item.title}
      </MyButton>
  );
};


// const Button = ({ item, switchType }) => {
//   return (
//     <MyButton
//       onClick={() => {
//         switchType(item.type);
//       }}
//     >
//       {item.title}
//     </MyButton>
//   );
// };

export default Button;
