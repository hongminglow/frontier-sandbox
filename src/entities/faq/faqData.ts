export type FAQEntry = {
  question: string
  answer: string
}

export const faqData: FAQEntry[] = [
  {
    question: 'Is PawMatch really free?',
    answer:
      'Yes. The Puppy plan is free forever, with a profile, browsing, and 10 swipes per day. Upgrade anytime for more matches and care features.',
  },
  {
    question: 'How does the matching algorithm work?',
    answer:
      'PawMatch considers breed compatibility, energy level, size, age, location, and activity preferences to suggest matches that make sense.',
  },
  {
    question: 'Is it safe to meet dogs from the app?',
    answer:
      'Safety is central to the experience. Profiles can be vet-verified, and in-app chat helps owners coordinate before meeting in public spaces.',
  },
  {
    question: 'Can I use PawMatch for breeding?',
    answer:
      'PawMatch is designed first for playdates and socialization, while Premium includes breed-specific matching tools some breeders find useful.',
  },
  {
    question: "What if my dog doesn't get along with a match?",
    answer:
      'Not every match is perfect. You can unmatch anytime, and the algorithm learns from preferences to suggest better future matches.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'Cancel anytime from account settings. There are no hidden fees, and your plan stays active until the end of the billing period.',
  },
]
