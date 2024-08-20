import clsx, {ClassArray, ClassDictionary, ClassValue} from 'clsx'

export const cn = (classes: ClassDictionary | ClassArray[]) => clsx(...classes)
