import { useAppDispatch } from '@/hooks/useRedux';
import { Editor } from './Editor';
import styles from './EditorPage.module.css';
import { getGraphQLSchema } from '@/store/schemaSlice';

export const EditorPage = () => {
  const dispatch = useAppDispatch();
  dispatch(getGraphQLSchema());

  return (
    <div className={styles.wrapper}>
      <Editor />
    </div>
  );
};
