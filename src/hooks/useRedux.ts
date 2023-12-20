import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/reducers';

const useRedux = () => {
    const dispatch = useDispatch<AppDispatch>();
    const appSelector: TypedUseSelectorHook<RootState> = useSelector;
    return { dispatch, appSelector };
};

export default useRedux;
