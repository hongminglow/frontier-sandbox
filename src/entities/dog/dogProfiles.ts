const dogPortraitSheet = '/dog-portraits-sheet.png'

export type DogProfile = {
  name: string
  breed: string
  age: string
  energy: string
  match: string
  image: string
  position: string
}

export const dogProfiles: DogProfile[] = [
  {
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '3 yrs',
    energy: 'Park sprinter',
    match: '98%',
    image: dogPortraitSheet,
    position: '0% 0%',
  },
  {
    name: 'Mochi',
    breed: 'Corgi',
    age: '2 yrs',
    energy: 'Cuddle captain',
    match: '94%',
    image: dogPortraitSheet,
    position: '50% 0%',
  },
  {
    name: 'Atlas',
    breed: 'Husky',
    age: '4 yrs',
    energy: 'Trail runner',
    match: '91%',
    image: dogPortraitSheet,
    position: '100% 0%',
  },
  {
    name: 'Noodle',
    breed: 'Dachshund',
    age: '5 yrs',
    energy: 'Snack scout',
    match: '89%',
    image: dogPortraitSheet,
    position: '0% 100%',
  },
  {
    name: 'Poppy',
    breed: 'Poodle Mix',
    age: '1 yr',
    energy: 'Zoomies pro',
    match: '96%',
    image: dogPortraitSheet,
    position: '50% 100%',
  },
  {
    name: 'Scout',
    breed: 'Border Collie',
    age: '3 yrs',
    energy: 'Frisbee ace',
    match: '92%',
    image: dogPortraitSheet,
    position: '100% 100%',
  },
]

export const breedGallery = [
  ...dogProfiles,
  {
    name: 'Bean',
    breed: 'French Bulldog',
    age: '2 yrs',
    energy: 'Cafe patio regular',
    match: '88%',
    image: dogPortraitSheet,
    position: '50% 0%',
  },
  {
    name: 'Nova',
    breed: 'Samoyed',
    age: '4 yrs',
    energy: 'Snow day socialite',
    match: '90%',
    image: dogPortraitSheet,
    position: '100% 0%',
  },
]
