import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
    const navigate = useNavigate()
    
    return (
        <div>
        {/* Эта кнопка внутри  Form,чтобы предотвратить ее поведения нужно */}
        <Button type="back" onClick={(e) => {
          e.preventDefault();
            navigate(-1)}}
            >
            &larr; Back</Button>
        </div>
    )
}
export default ButtonBack;