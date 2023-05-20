import { Editor } from './Editor';
import styles from './EditorPage.module.css';

export const EditorPage = () => {
  return (
    <div className={styles.wrapper}>
      <Editor />
    </div>
  );
};
