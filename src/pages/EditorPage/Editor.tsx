import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
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
  schemaResponse: UseQueryResult<GraphQLSchema, unknown>;
}

export const Editor = ({ schemaResponse }: EditorProps) => {
  const { mutate, isLoading } = useMutation<
    IApiResponse,
    AxiosError<IApiResponseError>,
    IApiRequest
  >((data) => apiController.getGraphQLResponse(data), {
    onSuccess: (response) => {
      setQueryResponse(JSON.stringify(response, null, ' '));
    },
    onError: (err) => {
      setQueryResponse(err.response?.data.errors[0].message ?? 'error');
    },
  });

  const [queryResponse, setQueryResponse] = useState('');
  const [query, setQuery] = useState<IApiRequest>({ headers: '', query: '', variables: '' });
  const { t } = useTranslation();
  const placeholderValue = t('editor.pattern');

  const onQueryChange = useCallback((value: string) => {
    setQuery((prev) => {
      return { ...prev, query: value };
    });
  }, []);

  const onVariablesChange = useCallback((value: string) => {
    setQuery((prev) => {
      return { ...prev, variables: value };
    });
  }, []);

  const onHeadersChange = useCallback((value: string) => {
    setQuery((prev) => {
      return { ...prev, headers: value };
    });
  }, []);

  const handleSubmit = () => {
    mutate(query);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor}>
        <div className={styles.editorWrapper}>
          <div className={styles.editorField}>
            <QueryIDE
              value=""
              placeholder={placeholderValue}
              onChange={onQueryChange}
              extensions={extensions(schemaResponse.data)}
            />
          </div>
          <div className={styles.editorButtons}>
            <button type="button" className={styles.runButton} onClick={handleSubmit}>
              {!isLoading && <img className={styles.buttonIcon} src={playIcon} alt="Run" />}
              {isLoading && <img className={styles.buttonIcon} src={stopIcon} alt="Stop" />}
            </button>
          </div>
        </div>
        <EditorTools onVariablesChange={onVariablesChange} onHeadersChange={onHeadersChange} />
      </div>
      <div className={styles.response}>
        <ResponseIDE value={queryResponse} />
      </div>
    </div>
  );
};
