import { forwardRef } from "react";
import { TextInput } from "react-native";

export default UnderlineInput = forwardRef(({ onChange, placeholder, className, ...props }, ref) => {
  return <TextInput
    ref={ref}
    placeholder={placeholder}
    className={`pb-7 mx-20 text-white placeholder:text-white/50 font-libre-franklin font-bold text-28 text-center border-b-1 border-b-white/10 ${className}`}
    onChangeText={onChange}
    // defaultValue="Crocrotte"
  />;
});
