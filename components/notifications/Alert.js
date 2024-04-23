import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../store";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap-rn";

export default Alert = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const alertRef = useRef();
  const [timerLaunched, setTimerLaunched] = useState(false)
  const timer = useRef();
  const i = useRef();

  handleOnUpdateAlert = (text) => {
    dispatch(updateAlert(text));
  };

  useEffect(() => {
    if (!timerLaunched) {
      setTimerLaunched(true)
      i.current = 5;
      timer.current = setInterval(() => {
        if (i.current === 0) {
          handleOnUpdateAlert(false)
          clearInterval(timer.current)
        } else {
          handleOnUpdateAlert(`Ton tour dans ${i.current} secondes`);
        }

        i.current--;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (alert && !timerLaunched) {
      gsap.fromTo(
        alertRef.current,
        { transform: { y: -30 }, style: { alpha: 0 } },
        { transform: { y: 0 }, style: { alpha: 1 }, delay: 1 }
      );
    } 
  }, [alert]);

  return (
    alert && (
      <View
        className="absolute top-60 flex flex-col items-center self-center w-full z-10"
        ref={alertRef}>
        <View className="px-20 py-10 bg-white rounded-full">
          <Text className="font-libre-franklin text-14 text-marine">
            {alert}
          </Text>
        </View>
      </View>
    )
  );
};
