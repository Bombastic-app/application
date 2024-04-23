import { forwardRef } from "react";
import { TextInput, View } from "react-native";

export default UnderlineInput = forwardRef(({ onChange, placeholder, className, isNumbers = false, ...props }, ref) => {
  return <View ref={ref} className="w-full">
    <TextInput
      keyboardType={isNumbers ? 'numeric' : 'default'}
      placeholder={placeholder}
      returnKeyType={ 'done' }
      className={`pb-7 text-white placeholder:text-white/50 font-libre-franklin font-bold text-28 text-center border-b-1 border-b-white/10 ${className}`}
      onChangeText={onChange}
      // defaultValue="Crocrotte"
    />
  </View>
});
