import { RUSSIAN_LANGUAGE } from '../language/russian';
import { ENGLISH_LANGUAGE } from '../language/english';

export default function( state = ENGLISH_LANGUAGE, action ) {
  if( action.type === "SET_LANGUAGE" ) {
    if( action.lang === "rus" ) return RUSSIAN_LANGUAGE;
    if( action.lang === "eng" ) return ENGLISH_LANGUAGE;
    return RUSSIAN_LANGUAGE;
  }
  return state;
}