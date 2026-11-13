// AquaResQ brand system (from the project brief). White + ocean mist dominate; no dark backgrounds.
export const C = {
  white: '#FFFFFF',
  mist: '#E9F8F5',
  teal: '#18A999',
  green: '#79C9B0',
  water: '#B9E7F2',
  forest: '#174D40',
  slate: '#607D78',
  amber: '#F4C66A',
  coral: '#E8756A',
  // darker text-safe variants (amber / coral are fills, these are for text on white)
  amberDeep: '#9A6A0A',
  coralDeep: '#C2453A',
  paper: '#F4FBF9',
} as const;

export const FONT =
  "'Inter','Poppins','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif";

export const SHADOW = '0 18px 50px rgba(23,77,64,0.14), 0 2px 8px rgba(23,77,64,0.08)';
export const SHADOW_SOFT = '0 10px 30px rgba(23,77,64,0.10)';
