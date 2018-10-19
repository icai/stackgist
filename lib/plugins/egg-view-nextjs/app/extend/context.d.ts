import 'egg'; // Make sure ts to import egg declaration at first
import ExtendContext from './context';
declare module 'egg' {
  type ExtendContextType = typeof ExtendContext;
  interface Context extends ExtendContextType { }
}