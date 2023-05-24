import { useState } from 'react';
import { jsonLanguage } from '@codemirror/lang-json';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { useTranslation } from 'react-i18next';
import { QueryIDE } from './QueryIDE';

import styles from './EditorTools.module.css';
import classNames from 'classnames';
import { Arrow } from '@/components/BasicComponents/Arrow';

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
  const [isToolsHidden, setIsToolsHidden] = useState(false);
  const { t } = useTranslation();
  const toolsToggleHandler = () => {
    setIsToolsHidden((prev) => !prev);
  };

  return (
    <div className={classNames(styles.editorTools, { [styles.hidden]: isToolsHidden })}>
      <div className={styles.toolsButtons}>
        <div className={styles.toolsContainer}>
          <button
            type="button"
            className={classNames(styles.toolsButton, {
              [styles.active]: toolsView === 'variables',
            })}
            onClick={() => setToolsView('variables')}
          >
            {t('editor.variables')}
          </button>
          <button
            type="button"
            className={classNames(styles.toolsButton, {
              [styles.active]: toolsView === 'headers',
            })}
            onClick={() => setToolsView('headers')}
          >
            {t('editor.headers')}
          </button>
        </div>
        <Arrow className={styles.arrow} onClickHandler={toolsToggleHandler} />
      </div>
      {!isToolsHidden && (
        <>
          <div
            className={classNames(styles.toolsIDE, { [styles.opacity]: toolsView === 'variables' })}
          >
            <QueryIDE value="" onChange={onVariablesChange} extensions={extensions} />
          </div>
          <div
            className={classNames(styles.toolsIDE, { [styles.opacity]: toolsView === 'headers' })}
          >
            <QueryIDE value="" onChange={onHeadersChange} extensions={extensions} />
          </div>
        </>
      )}
    </div>
  );
};
