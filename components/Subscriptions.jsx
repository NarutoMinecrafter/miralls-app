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
        price: '149.99',
        descriptionTitle: 'Все преимущества PRO:',
        description: `\u2022 Ежедневный лимит лайков поднят до 30 шт
\u2022 Лимит публикаций поднят до 30 шт на месяц
\u2022 Большая вероятность попадания публикаций в рекомендации
\u2022 Обработка вывода средств до 24-х часов`
      },
      {
        title: 'PRO 1 MONTH',
        price: '15.99',
        descriptionTitle: 'Все преимущества PRO:',
        description: `\u2022 Ежедневный лимит лайков поднят до 30 шт
\u2022 Лимит публикаций поднят до 30 шт на месяц
\u2022 Большая вероятность попадания публикаций в рекомендации
\u2022 Обработка вывода средств до 24-х часов`
      },
      {
        title: 'PRO 3 MONTHS ',
        price: '39.99',
        descriptionTitle: 'Все преимущества PRO:',
        description: `\u2022 Ежедневный лимит лайков поднят до 30 шт
\u2022 Лимит публикаций поднят до 30 шт на месяц
\u2022 Большая вероятность попадания публикаций в рекомендации
\u2022 Обработка вывода средств до 24-х часов`
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
            </View>
            <ScrollView horizontal contentOffset={{ x: 420 }} style={s.Content.Carousel} contentContainerStyle={s.Content.CarouselContainer}>
              {data.map(item => <View style={s.Content.Item}>
                <Text style={[s.Content.Text, s.Content.Title, s.Content.Price]}>{item.title}</Text>
                <Text style={[s.Content.Text, s.Content.Title, s.Content.Price]}>{item.price} $</Text>
                <Button title={t.Button} variant="outlined" style={s.Content.Button} />
                <Text style={[s.Content.Text, s.Content.Title]}>{item.descriptionTitle}</Text>
                <Text style={[s.Content.Text, s.Content.Description]}>{item.description}</Text>
              </View>)}
            </ScrollView>
            <Text style={[s.Content.Text, s.Content.CommonDescription]}>{`\u2022 Подписка будет действовать только на этом аккаунте не зависимо на каком устройстве он будет открыт.
\u2022 Ваша подписка начнется, как только вы подтвердите покупку.
\u2022 Все подписки продлеваюься автоматически, но вы можете отменить их до окончания вашего пробного периода или текущего расчётного периода.
\u2022 Вы можете изменить тип подписки в Настройках (Меню - Настройки - Подписка). Отменить подписку можно только через настройки IOS (Настройки - Ваше имя - Подписки- Выбрать подписки - Отмпнить).
\u2022 Может быть добавлен налог с продаж, в зависимости от вашего местоположения.`}</Text>
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
        width: 1230
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
          borderColor: Colors.White,
      },
      Title: {
        padding: 5,
        fontWeight: 'bold',
      },
      Price: {
        fontSize: 20,
        textAlign: 'center'
      },
      Button: {
        margin: 5,
      },
      Description: {
        paddingLeft: 15
      },
      CommonDescription: {
        padding: 20
      }
    }
}