import React from 'react'
import { View, Text, Image } from 'react-native';
import { Colors } from '../constants'
import _ from "./i18n";
import Header from './Header';
import CoinIcon from '../assets/coin-icon.png';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from "@react-native-material/core";
import { COURSE } from './utils/constants';
import Intl from 'intl'
import 'intl/locale-data/jsonp/ru-RU'

export default function WalletScreen({ navigation: { navigate } }) {
    const t = _('WalletScreen')
    const mockData = {
      'Сегодня': [
        { for: 'Вознаграждение за лайк', isPlus: true, count: 1, time: '12:04 PM' },
        { for: 'Вознаграждение за лайк', isPlus: false, count: '16 695', time: '12:04 PM' },
      ],
      'Вчера': [
        { for: 'Вознаграждение за лайк', isPlus: true, count: 1, time: '12:04 PM' },
      ],
      '30.09.22': [
        { for: 'Вознаграждение за лайк', isPlus: true, count: 1, time: '12:04 PM' },
        { for: 'Вознаграждение за лайк', isPlus: false, count: 960, time: '12:04 PM' },
      ],
    }

    const balance = 27695

    const balanceFormatter = new Intl.NumberFormat('ru-RU')

    const courseFormatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
    })

    return (
        <View style={s.GlobalWrapper}>
            <View style={s.Content.Wrapper}>
              <Header
                  title={t.Title}
                  backButton={true}
                  backButtonText={_("Back")}
                  wrapperStyle={{ marginBottom: 8, paddingHorizontal: 16 }}
                />
                <View style={s.Content.BalanceHeader}>
                  <View style={s.Content.Balance}>
                    <Image source={CoinIcon} style={s.Content.BalanceIcon} />
                    <Text style={[s.Content.Tetx, s.Content.BalanceText]}>{balanceFormatter.format(balance)}</Text>
                  </View>
                  <Text style={[s.Content.Tetx, s.Content.Time, s.Content.ItemBalancetext]}>{courseFormatter.format(balance * COURSE)}</Text>
                  <Button style={[s.Content.Tetx, s.Content.Button]} title={t.Withdrawal} variant="outlined" />
                </View>
                <ScrollView>
                  {Object.keys(mockData).map((key) => <>
                    <Text key={key} style={[s.Content.Tetx, s.Content.BlockHeader]}>{key}</Text>
                    {mockData[key].map((item) => <View style={s.Content.Item}>
                      <View>
                        <Text style={[s.Content.Tetx]}>{item.for}</Text>
                        <Text style={s.Content.Time}>{item.time}</Text>
                      </View>
                      <View style={s.Content.ItemBalance}>
                        <Text style={[s.Content.ItemBalancetext, item.isPlus ? s.Content.ItemBalancetextPlus : s.Content.ItemBalancetextMinus]}>{item.isPlus ? '+' : '-'}{item.count}</Text>
                        <Image source={CoinIcon} style={s.Content.Icon} />
                      </View>
                    </View>)}
                  </>)}
                </ScrollView>
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
          marginTop: 22,
      },
      Tetx: {
        fontSize: 14,
        color: Colors.White
      },
      BalanceHeader: {
        alignItems: 'center'
      },
      Balance: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      BalanceIcon: {
        width: 40,
        height: 40
      },
      BalanceText: {
        fontSize: 45,
        fontWeight: 'bold'
      },
      Button: {
        margin: 15,
        width: 200,
      },
      BlockHeader: {
        padding: 12,
        backgroundColor: '#222'
      },
      Item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
      },
      Time: {
        color: Colors.SubText
      },
      Icon: {
        width: 25,
        height: 25
      },
      ItemBalance: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      ItemBalancetext: {
        fontSize: 22,
      },
      ItemBalancetextPlus: {
        color: '#5bc35b'
      },
      ItemBalancetextMinus: {
        color: '#ff6d6d'
      }
    }
}