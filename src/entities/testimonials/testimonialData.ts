export type Testimonial = {
  owner: string
  dogs: string
  quote: string
  rating: number
  match: string
  position: string
}

export const testimonialData: Testimonial[] = [
  {
    owner: 'Maya Chen',
    dogs: 'Luna + Scout',
    quote: 'Luna found her favorite park buddy in two swipes. They now meet every Saturday morning.',
    rating: 5,
    match: '98%',
    position: '0% 0%',
  },
  {
    owner: 'Jordan Ellis',
    dogs: 'Mochi + Bean',
    quote: 'The energy-level filter saved us hours. Mochi finally has a match who loves short walks.',
    rating: 5,
    match: '94%',
    position: '50% 0%',
  },
  {
    owner: 'Priya Shah',
    dogs: 'Poppy + Atlas',
    quote: 'We wanted safe, verified playdates. PawMatch made every intro feel calm and simple.',
    rating: 5,
    match: '96%',
    position: '50% 100%',
  },
  {
    owner: 'Noah Rivera',
    dogs: 'Noodle + Nova',
    quote: 'The first meetup turned into a dog-park friend group. The scheduler is ridiculously useful.',
    rating: 5,
    match: '90%',
    position: '0% 100%',
  },
]
