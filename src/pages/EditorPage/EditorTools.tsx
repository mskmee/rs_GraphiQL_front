import { useState } from 'react';
import styles from './EditorTools.module.css';
import classNames from 'classnames';
import { QueryIDE } from './QueryIDE';

interface EditorToolsProps {
  onVariablesChange: (value: string) => void;
  onHeadersChange: (value: string) => void;
}

export const EditorTools = ({ onVariablesChange, onHeadersChange }: EditorToolsProps) => {
  const [toolsView, setToolsView] = useState('variables');

  return (
    <div className={styles.editorTools}>
      <div className={styles.toolsButtons}>
        <button
          type="button"
          className={classNames(styles.toolsButton, {
            [styles.active]: toolsView === 'variables',
          })}
          onClick={() => setToolsView('variables')}
        >
          Variables
        </button>
        <button
          type="button"
          className={classNames(styles.toolsButton, {
            [styles.active]: toolsView === 'headers',
          })}
          onClick={() => setToolsView('headers')}
        >
          Headers
        </button>
      </div>
      <div className={classNames(styles.toolsIDE, { [styles.opacity]: toolsView === 'variables' })}>
        <QueryIDE value="" onChange={onVariablesChange} />
      </div>
      <div className={classNames(styles.toolsIDE, { [styles.opacity]: toolsView === 'headers' })}>
        <QueryIDE value="" onChange={onHeadersChange} />
      </div>
    </div>
  );
};
