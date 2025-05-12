export interface FormData {
  // Personal information
  fullName: string;
  whatsapp: string;
  email: string;
  
  // Project information
  companyName: string;
  businessType: string;
  siteObjective: string;
  targetRegion: string;
  colorPreferences: string;
  productsServices: string;
  siteDifferential: string;
  socialMedia: string;
  domain: string;
  
  // Automation choices
  wantsAutomation: boolean | null;
  confirmNoAutomation: boolean | null;
}