import { useCallback, useState } from 'react';
import styles from './Editor.module.css';
import { QueryIDE } from './QueryIDE';
import { EditorTools } from './EditorTools';
import { ResponseIDE } from './ResponseIDE';
import playIcon from '@/assets/icons/play.png';
import stopIcon from '@/assets/icons/stop.png';
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiController } from '@/api/apiController';
import { AxiosError } from 'axios';
import { IApiResponseError, IApiResponse, IApiRequest } from '@/types/interfaces';

const extensions = (schema?: GraphQLSchema) => [
  graphql(schema, {
    // onShowInDocs(field, type, parentType) {
    //   alert(`Showing in docs.: Field: ${field}, Type: ${type}, ParentType: ${parentType}`);
    // },
    // onFillAllFields(_query, token) {
    //   alert(`Filling all fields. Token: ${token}`);
    // },
  }),
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

export const Editor = () => {
  const schemaResponse = useQuery(['getSchema'], apiController.getSchema);
  const { mutate, isLoading } = useMutation<
    IApiResponse,
    AxiosError<IApiResponseError>,
    IApiRequest
  >((data) => apiController.getGraphQLResponse(data), {
    onSuccess: (response) => {
      setQueryResponse(JSON.stringify(response, null, ' '));
    },
    onError: (err) => {
      setQueryResponse(err.response?.data.errors[0].message ?? err.toString());
    },
  });

  const [queryResponse, setQueryResponse] = useState('');
  const [query, setQuery] = useState<IApiRequest>({ headers: '', query: '', variables: '' });
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
              placeholder="Enter your query here"
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
