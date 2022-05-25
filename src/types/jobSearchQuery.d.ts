interface jobQuery {
  location: string;
  description: string;
  fulltime: boolean;
  page: number;
  limit: number;
}

interface jobData {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string | null;
}
