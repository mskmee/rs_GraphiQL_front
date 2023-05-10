import { useCallback, useState } from 'react';
import styles from './Editor.module.css';
import { QueryIDE } from './QueryIDE';
import { EditorTools } from './EditorTools';
import { ResponseIDE } from './ResponseIDE';
import playIcon from '@/assets/icons/play.png';
import stopIcon from '@/assets/icons/stop.png';

export const Editor = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onQueryChange = useCallback((value: string) => {
    console.log('query:', value);
  }, []);

  const onVariablesChange = useCallback((value: string) => {
    console.log('variables:', value);
  }, []);

  const onHeadersChange = useCallback((value: string) => {
    console.log('headers:', value);
  }, []);

  // TODO execute query function

  const executeQuery = async (/* graphQLParams */) => {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      // body: JSON.stringify(graphQLParams),
    });

    const result = await response.json();
    return result;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor}>
        <div className={styles.editorWrapper}>
          <div className={styles.editorField}>
            <QueryIDE value="" placeholder="Enter your query here" onChange={onQueryChange} />
          </div>
          <div className={styles.editorButtons}>
            <button type="button" className={styles.runButton} onClick={() => {}}>
              {!isLoading && <img className={styles.buttonIcon} src={playIcon} alt="Run" />}
              {isLoading && <img className={styles.buttonIcon} src={stopIcon} alt="Stop" />}
            </button>
          </div>
        </div>
        <EditorTools onVariablesChange={onVariablesChange} onHeadersChange={onHeadersChange} />
      </div>
      <div className={styles.resronse}>
        <ResponseIDE value="" />
      </div>
    </div>
  );
};
