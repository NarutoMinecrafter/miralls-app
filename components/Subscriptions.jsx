import React from 'react'
import { View, ScrollView, Text } from 'react-native';
import { Colors } from '../constants'
import _ from "./i18n";
import Header from './Header';
import { Button } from "@react-native-material/core";

export default function Subscriptions({ navigation: { navigate } }) {
    const t = _('Subscriptions')
    const data = [
      {
        title: 'PRO 1 YEAR',
        price: '149,99',
        descriptionTitle: t.DescriptionTitle,
        description: t.Description
      },
      {
        title: 'PRO 1 MONTH',
        price: '15,99',
        descriptionTitle: t.DescriptionTitle,
        description: t.Description
      },
      {
        title: 'PRO 3 MONTHS ',
        price: '39,99',
        descriptionTitle: t.DescriptionTitle,
        description: t.Description
      },
    ]

    return (
        <View style={s.GlobalWrapper}>
            <View style={s.Content.Wrapper}>
              <Header
                  title={t.Title}
                  backButton={true}
                  backButtonText={_("Back")}
                  wrapperStyle={{ marginBottom: 8, paddingHorizontal: 16 }}
                />
                <ScrollView horizontal contentOffset={{ x: 420 }} style={s.Content.Carousel} contentContainerStyle={s.Content.CarouselContainer}>
                {data.map(item => <View style={s.Content.Item}>
                  <Text style={[s.Content.Text, s.Content.Title, s.Content.Price]}>{item.title}</Text>
                  <View style={s.Content.Price}>
                    <Text style={[s.Content.Text, s.Content.PriceUSD]}>USD </Text>
                    <Text style={[s.Content.Text, s.Content.PriceText]}>{item.price}</Text>
                    <Text style={[s.Content.SubText, s.Content.PriceMonth]}> /{t.Month}</Text>
                  </View>
                  <Button title={t.Button} style={s.Content.Button} />
                  <Text style={[s.Content.Text, s.Content.Title]}>{item.descriptionTitle}</Text>
                  {t.Description.map(text => <Text style={[s.Content.Text, s.Content.Description]}>{text}</Text>)}
                </View>)}
              </ScrollView>
              <View style={s.Content.Common}>
                {t.Common.map(text => <Text style={s.Content.SubText}>{text}</Text>)}
              </View>
            </View>
        </View>
    )
}

const s = {
    GlobalWrapper: {
		height: '100%',
		width: '100%',
    backgroundColor: Colors.BG,
    },
    Content: {
      Wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      Carousel: {
        color: Colors.White,
      },
      CarouselContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        width: 1233,
        // height: 350
      },
      Text: {
        color: Colors.White
      },
      Item: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        width: '25%',
        borderColor: Colors.SubText,
      },
      Title: {
        padding: 5,
        fontWeight: 'bold',
      },
      Price: {
        flexDirection:'row',
        justifyContent: 'center'
      },
      PriceText: {
        fontWeight: 'bold',
        fontSize: 30
      },
      PriceUSD: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5
      },
      PriceMonth: {
        marginTop: 15
      },
      Button: {
        margin: 5,
      },
      Description: {
        paddingLeft: 15
      },
      SubText: {
        color: Colors.SubText
      },
      Common: {
        padding: 20
      }
    }
}