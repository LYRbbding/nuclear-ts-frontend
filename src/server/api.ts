const apiList = {
  'nuclear_list': '/nuclear_list',
  'nuclear_update': '/nuclear_update',
}

export type apiKeyType = keyof typeof apiList;

export interface Student {
  id: string;
  name: string;
  status: string;
  date: string;
}

export interface nuclear_list {
  errCode: number;
  errMsg: string; 
  res: Student[]
}

export interface nuclear_update {
  errCode: number;
  errMsg: string; 
}

export interface apiKeyDataType {
  'nuclear_list': nuclear_list,
  'nuclear_update': nuclear_update,
}

export default apiList;