import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import createTheme from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
// import { graphql } from 'cm6-graphql';

const editorTheme = createTheme({
  theme: 'light',
  settings: {
    gutterBorder: 'transparent',
    background: '#ffffff',
    foreground: '#75baff',
    caret: '#5d00ff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: '#8a91991a',
    gutterBackground: '#fff',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: '#1ea372' },
    { tag: t.bool, color: 'var(--yellow-color)' },
    { tag: t.null, color: '#666669' },
    { tag: t.keyword, color: '#5c6166' },
    { tag: t.operator, color: 'var(--violet-color)' },
    { tag: t.className, color: '#5c6166' },
    { tag: t.definition(t.typeName), color: '#5c6166' },
    { tag: t.typeName, color: '#5c6166' },
    { tag: t.angleBracket, color: '#5c6166' },
    { tag: t.tagName, color: '#5c6166' },
    { tag: t.attributeName, color: '#5c6166' },
    { tag: t.brace, color: 'var(--violet-color)' },
    { tag: t.name, color: 'var(--violet-color)' },
    { tag: t.propertyName, color: 'var(--violet-color)' },
    { tag: t.number, color: 'var(--orange-color)' },
  ],
});

interface QueryIDEProps {
  value: string;
  placeholder?: string;
  opacity?: string;
  onChange: (value: string) => void;
}

export const QueryIDE = ({ value, placeholder, opacity, onChange }: QueryIDEProps) => {
  return (
    <CodeMirror
      style={{ opacity }}
      value={value}
      placeholder={placeholder}
      height="100%"
      extensions={[jsonLanguage /* graphql(myGraphQLSchema) */]}
      theme={editorTheme}
      onChange={onChange}
    />
  );
};
