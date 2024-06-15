export const getColor = (category: string) => {
  switch (category) {
    case "Fruit":
      return "ruby"
    case "Légume":
      return "grass"
    case "Poisson":
      return "sky"
    case "Viande":
      return "gold"
    case "Fruits de mer":
      return "indigo"
    case "Céréale":
      return "amber"
    case "Légumineuse":
      return "teal"
    case "Prod. Laitier":
      return "gray"
  }
}