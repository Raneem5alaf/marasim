export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  tags: string[];
  startingPrice?: string;
  features: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlightTag: string;
  detail: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  eventType: string;
  rating: number;
  comment: string;
  avatar: string;
  avatarBg?: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface QuoteFormData {
  eventType: string;
  city: string;
  guestCount: string;
  budget: string;
  date: string;
  name: string;
  phone: string;
  notes: string;
}
