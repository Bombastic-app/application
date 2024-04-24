import { useLocalSearchParams } from "expo-router";
import PhotoToFill from "../../pages/PhotoToFill";

export default ImagePage = () => {
  let { type, content, title } = useLocalSearchParams();

  return (
    <PhotoToFill type={type} content={content} title={title} />
  )
}