interface ICategory {
  _id?: string;
  name: string;
  description: string;
  icon?: string | FileList;
}

interface ICategoryForm extends ICategory {
  icon: FileList;
}

export type { ICategory, ICategoryForm };
