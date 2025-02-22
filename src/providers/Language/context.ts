import { createContext } from 'react';
import { ILanguageProviderContext } from './types';

const LanguageProviderContext = createContext<ILanguageProviderContext | null>(null);

export default LanguageProviderContext;
