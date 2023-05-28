import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { apiController } from '@/api/apiController';
import { QueryIDE } from './QueryIDE';
import { EditorTools } from './EditorTools';
import { ResponseIDE } from './ResponseIDE';
import { AxiosError } from 'axios';
import { IApiResponseError, IApiResponse, IApiRequest } from '@/types/interfaces';

import playIcon from '@/assets/icons/play.png';
import stopIcon from '@/assets/icons/stop.png';
import styles from './Editor.module.css';
import classNames from 'classnames';
import { getApiRequestArg } from '@/utils/getApiRequestArg';

const extensions = (schema?: GraphQLSchema) => [
  graphql(schema),
  autocompletion({
    activateOnTyping: true,
    icons: true,
  }),
  Prec.high(
    keymap.of([
      {
        key: 'Tab',
        run: acceptCompletion,
      },
      {
        key: 'Mod-Enter',
        run: () => true,
      },
    ])
  ),
];

interface EditorProps {
  schema: GraphQLSchema | undefined;
}

export const Editor = ({ schema }: EditorProps) => {
  const { mutate, isLoading } = useMutation<
    IApiResponse,
    AxiosError<IApiResponseError | string>,
    IApiRequest
  >((data) => apiController.getGraphQLResponse(data), {
    onSuccess: (response) => {
      setQueryResponse(JSON.stringify(response, null, ' '));
    },
    onError: (err) => {
      if (typeof err.response?.data === 'string') {
        return setQueryResponse(err.response.data);
      }

      setQueryResponse(err.response?.data.errors[0].message ?? (err as Error).message);
    },
  });

  const [queryResponse, setQueryResponse] = useState('');
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [areToolsOpen, setAreToolsOpen] = useState(true);
  const { t } = useTranslation();
  const placeholderValue = t('editor.pattern');

  const onQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const onVariablesChange = useCallback((value: string) => {
    setVariables(value);
  }, []);

  const onHeadersChange = useCallback((value: string) => {
    setHeaders(value);
  }, []);

  const handleSubmit = () => {
    try {
      const validateRequest = getApiRequestArg(query, variables, headers);
      mutate(validateRequest);
    } catch (error) {
      setQueryResponse((error as Error).message);
    }
  };

  const onToolsClose = (value: boolean) => {
    setAreToolsOpen(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor}>
        <div className={classNames(styles.editorWrapper, { [styles.editorWide]: !areToolsOpen })}>
          <div className={styles.editorField}>
            <QueryIDE
              value=""
              placeholder={placeholderValue}
              onChange={onQueryChange}
              extensions={extensions(schema)}
            />
          </div>
          <div className={styles.editorButtons}>
            <button
              title="Run query"
              type="button"
              className={styles.runButton}
              onClick={handleSubmit}
            >
              {!isLoading && (
                <img className={styles.buttonIcon} src={playIcon} alt="Run" draggable="false" />
              )}
              {isLoading && (
                <img className={styles.buttonIcon} src={stopIcon} alt="Stop" draggable="false" />
              )}
            </button>
          </div>
        </div>
        <EditorTools
          variablesValue={variables}
          headersValue={headers}
          onVariablesChange={onVariablesChange}
          onHeadersChange={onHeadersChange}
          onToolsClose={onToolsClose}
        />
      </div>
      <div className={styles.response}>
        <ResponseIDE value={queryResponse} />
      </div>
    </div>
  );
};
