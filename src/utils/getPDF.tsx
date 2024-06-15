import { createTw } from "react-pdf-tailwind";
import { SelectedData } from "../types";
import { Page, Text, View, Document, StyleSheet, pdf, Font } from '@react-pdf/renderer';

export const getPDF = async (selectedData: SelectedData[]) => {
  const data = selectedData.map((item) => {
    return {
      name: item.food.name,
      category: item.food.category,
      calories: item.food.calories,
      carbohydrates: item.food.carbohydrates,
      proteins: item.food.proteins,
      lipids: item.food.lipids,
      portion: item.portion
    };
  });

  Font.register({
    family: 'YoungSerif',
    src: '/fonts/YoungSerif.ttf',
  });

  const tw = createTw({
    theme: {
      fontFamily: {
        youngserif: ["YoungSerif"],
      },
      extend: {
      },
    },
  });

  const MyPDF = () => (
    <Document>
      <Page size="A4" style={tw("bg-white w-full flex flex-col items-center justify-start gap-10 p-5")}>
        <View style={tw("flex flex-col w-full items-center justify-start")}>
          <Text style={tw("text-left text-4xl font-bold font-youngserif text-green-800 w-full")}>GreenFoodData</Text>
          <Text style={tw("text-left text-2xl font-bold text-green-800 w-full")}>Liste des aliments :</Text>
        </View>

        <View style={tw("w-full")}>
          {
            data.map((item, index) => (
              <View key={index} style={tw("w-[300px] p-5 border border-solid border-green-800 rounded-lg")}>
                <Text style={tw("text-left font-bold text-green-800")}>{item.name}</Text>
                <Text style={tw("text-left text-lg text-green-800")}>Catégorie : {item.category}</Text>
                <Text style={tw("text-left text-lg text-green-800")}>Portion : {item.portion} g</Text>
                <Text style={tw("text-left text-lg text-green-800")}>Calories : {item.calories} kcal</Text>
                <Text style={tw("text-left text-lg text-green-800")}>Proteines : {item.proteins} g</Text>
                <Text style={tw("text-left text-lg text-green-800")}>Carbohydrates : {item.carbohydrates} g</Text>
                <Text style={tw("text-left text-lg text-green-800")}>Lipides : {item.lipids} g</Text>
              </View>
            ))
          }
        </View>
      </Page>
    </Document>
  );

  const blob = await pdf(<MyPDF />).toBlob();

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'my-meal.pdf';
  link.click();
};
