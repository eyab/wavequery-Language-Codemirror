import {parser} from "./syntax.grammar"
import { LRLanguage, continuedIndent,LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"


/// A language provider that provides Waveform Query(WaveQL) Language parsing.

export const wavequeryLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        //Application: delimitedIndent({closing: ")", align: false})
        Object: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "Object Array": foldInside
      }),
      styleTags({
        String: t.string,
        LineComment: t.lineComment,
        null: t.null,
        ",": t.separator,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    //commentTokens: {line: "//"},
    closeBrackets: {brackets: ["[", "{", '"']},
    indentOnInput: /^\s*[\}\]]$/
  }
})

export function wavequery() {
  return new LanguageSupport(wavequeryLanguage)
}
