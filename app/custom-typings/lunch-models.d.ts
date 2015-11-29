interface LunchOption {
  id: string;
  name: string;
}

interface Person {
  id: string;
  imageUrl: string;
  name: string;
}

interface PersonChoice {
  person: Person;
  choiceId: string;
}

