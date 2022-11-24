const apiList = {
  'nuclear_list': '/nuclear_list',
  'nuclear_update': '/nuclear_update',
  'nuclear_school': '/nuclear_school',
}

export type apiKeyType = keyof typeof apiList;

export interface Student {
  class: string;
  id: string;
  name: string;
  school: string;
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

export interface nuclear_school {
  errCode: number;
  errMsg: string; 
}

export interface apiKeyDataType {
  'nuclear_list': nuclear_list,
  'nuclear_update': nuclear_update,
  'nuclear_school': nuclear_school,
}

export default apiList;