import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
} from "./hooks";
import { decrement, increment, reset } from "./store/countSlice";
import "./App.css";

function App() {
    const count = useSelector((state) => state.count.value); //
    const dispatch = useDispatch();

    return (
        <>
            <div className="button-group">
                <button onClick={() => dispatch(decrement())}>-</button>
                <button onClick={() => dispatch(reset())}>Reset</button>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>
            <div className="teste">{count}</div>
        </>
    );
}

export default App;
