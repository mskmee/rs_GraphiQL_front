import { useState } from 'react';
import styles from './EditorTools.module.css';
import classNames from 'classnames';
import { QueryIDE } from './QueryIDE';
import { jsonLanguage } from '@codemirror/lang-json';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';

const extensions = [
  autocompletion({
    activateOnTyping: true,
    icons: true,
  }),
  jsonLanguage,
  Prec.high(
    keymap.of([
      {
        key: 'Mod-Enter',
        run: () => true,
      },
    ])
  ),
];

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
        <QueryIDE value="" onChange={onVariablesChange} extensions={extensions} />
      </div>
      <div className={classNames(styles.toolsIDE, { [styles.opacity]: toolsView === 'headers' })}>
        <QueryIDE value="" onChange={onHeadersChange} extensions={extensions} />
      </div>
    </div>
  );
};
